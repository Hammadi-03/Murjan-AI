<?php
/**
 * Simple PHP Backend Proxy for Gemini AI
 * 
 * Provides a secure way to hold API keys on the server.
 * This script handles streaming responses (SSE).
 */

header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Connection: keep-alive');
header('X-Accel-Buffering: no');

// 1. Read .env file manually (simple implementation)
$envFile = __DIR__ . '/../.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($name, $value) = explode('=', $line, 2);
        putenv(trim($name) . '=' . trim($value));
    }
}

$apiKey = getenv('GEMINI_API_KEY');
if (!$apiKey) {
    echo "data: " . json_encode(['error' => 'GEMINI_API_KEY not found in server environment']) . "\n\n";
    exit;
}

// 2. Get input from POST request
$input = json_decode(file_get_contents('php://input'), true);
if (!$input || empty($input['messages'])) {
    http_response_code(400);
    echo "data: " . json_encode(['error' => 'Invalid request body']) . "\n\n";
    exit;
}

$messages = $input['messages'];
$modelId = $input['modelId'] ?? 'gemini-1.5-flash';

// 3. Prepare Gemini format
$contents = [];
foreach ($messages as $msg) {
    $contents[] = [
        'role' => $msg['role'] === 'user' ? 'user' : 'model',
        'parts' => [['text' => $msg['content']]]
    ];
}

$url = "https://generativelanguage.googleapis.com/v1beta/models/{$modelId}:streamGenerateContent?alt=sse&key={$apiKey}";

// 4. Proxy the request to Google
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, false);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['contents' => $contents]));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

// Stream the output directly to the client
curl_setopt($ch, CURLOPT_WRITEFUNCTION, function($ch, $data) {
    echo $data;
    if (ob_get_level() > 0) ob_flush();
    flush();
    return strlen($data);
});

curl_exec($ch);
curl_close($ch);
?>
