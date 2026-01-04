import indexHtml from '../index.html';

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const path = url.pathname;

        // CORS headers
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        // Handle CORS preflight requests
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                headers: corsHeaders,
            });
        }

        try {
            // Serve HTML page
            if (path === '/' || path === '/index.html') {
                return new Response(indexHtml, {
                    headers: {
                        'Content-Type': 'text/html;charset=UTF-8',
                    },
                });
            }
            // 404 Not Found
            return new Response('Not Found', {
                status: 404,
                headers: corsHeaders,
            });
        } catch (error) {
            console.error('Error:', error);
            return new Response(
                JSON.stringify({ error: '服务器错误: ' + error.message }),
                {
                    status: 500,
                    headers: {
                        'Content-Type': 'application/json',
                        ...corsHeaders,
                    },
                }
            );
        }
    },
};