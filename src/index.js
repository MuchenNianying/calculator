import indexHtml from '../index.html';
import styleCss from '../style.css';
import scriptJs from '../script.js';
import adsTxt from './ads.txt';
import sitemapXml from './sitemap.xml';


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
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                },
            });
        }
        // Serve CSS file
        if (path === '/style.css') {
            return new Response(styleCss, {
                headers: {
                    'Content-Type': 'text/css',
                    'Cache-Control': 'public, max-age=86400'
                },
            });
        }
        // Serve JavaScript file
        if (path === '/script.js') {
            return new Response(scriptJs, {
                headers: {
                    'Content-Type': 'application/javascript',
                    'Cache-Control': 'public, max-age=86400'
                },
            });
        }
            // Serve ads.txt file
            if (path === '/ads.txt') {
                return new Response(adsTxt, {
                    headers: {
                        'Content-Type': 'text/plain',
                        'Cache-Control': 'public, max-age=86400'
                    },
                });
            }
            // Serve sitemap.xml file
            if (path === '/sitemap.xml') {
                return new Response(sitemapXml, {
                    headers: {
                        'Content-Type': 'application/xml',
                        'Cache-Control': 'public, max-age=86400'
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