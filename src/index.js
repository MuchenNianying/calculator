import indexHtml from '../index.html';
import adsTxt from './ads.txt';
import sitemapXml from './sitemap.xml';

import baseCss from '../src/css/base.css';
import navigationCss from '../src/css/navigation.css';
import calculatorCss from '../src/css/calculator.css';
import mortgageCss from '../src/css/mortgage.css';
import taxCss from '../src/css/tax.css';
import currencyCss from '../src/css/currency.css';
import modalCss from '../src/css/modal.css';
import aboutCss from '../src/css/about.css';

import calculatorJs from '../src/js/calculator.js';
import currencyJs from '../src/js/currency.js';
import mortgageJs from '../src/js/mortgage.js';
import taxJs from '../src/js/tax.js';
import converterJs from '../src/js/converter.js';
import bmiJs from '../src/js/bmi.js';
import appJs from '../src/js/app.js';

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const path = url.pathname;

        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        if (request.method === 'OPTIONS') {
            return new Response(null, {
                headers: corsHeaders,
            });
        }

        try {
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
            
            if (path === '/ads.txt') {
                return new Response(adsTxt, {
                    headers: {
                        'Content-Type': 'text/plain',
                        'Cache-Control': 'public, max-age=86400'
                    },
                });
            }
            
            if (path === '/sitemap.xml') {
                return new Response(sitemapXml, {
                    headers: {
                        'Content-Type': 'application/xml',
                        'Cache-Control': 'public, max-age=86400'
                    },
                });
            }

            if (path === '/src/css/base.css') {
                return new Response(baseCss, {
                    headers: {
                        'Content-Type': 'text/css',
                        'Cache-Control': 'public, max-age=86400'
                    },
                });
            }

            if (path === '/src/css/navigation.css') {
                return new Response(navigationCss, {
                    headers: {
                        'Content-Type': 'text/css',
                        'Cache-Control': 'public, max-age=86400'
                    },
                });
            }

            if (path === '/src/css/calculator.css') {
                return new Response(calculatorCss, {
                    headers: {
                        'Content-Type': 'text/css',
                        'Cache-Control': 'public, max-age=86400'
                    },
                });
            }

            if (path === '/src/css/mortgage.css') {
                return new Response(mortgageCss, {
                    headers: {
                        'Content-Type': 'text/css',
                        'Cache-Control': 'public, max-age=86400'
                    },
                });
            }

            if (path === '/src/css/tax.css') {
                return new Response(taxCss, {
                    headers: {
                        'Content-Type': 'text/css',
                        'Cache-Control': 'public, max-age=86400'
                    },
                });
            }

            if (path === '/src/css/currency.css') {
                return new Response(currencyCss, {
                    headers: {
                        'Content-Type': 'text/css',
                        'Cache-Control': 'public, max-age=86400'
                    },
                });
            }

            if (path === '/src/css/modal.css') {
                return new Response(modalCss, {
                    headers: {
                        'Content-Type': 'text/css',
                        'Cache-Control': 'public, max-age=86400'
                    },
                });
            }

            if (path === '/src/css/about.css') {
                return new Response(aboutCss, {
                    headers: {
                        'Content-Type': 'text/css',
                        'Cache-Control': 'public, max-age=86400'
                    },
                });
            }

            if (path === '/src/js/calculator.js') {
                return new Response(calculatorJs, {
                    headers: {
                        'Content-Type': 'application/javascript',
                        'Cache-Control': 'public, max-age=86400'
                    },
                });
            }

            if (path === '/src/js/currency.js') {
                return new Response(currencyJs, {
                    headers: {
                        'Content-Type': 'application/javascript',
                        'Cache-Control': 'public, max-age=86400'
                    },
                });
            }

            if (path === '/src/js/mortgage.js') {
                return new Response(mortgageJs, {
                    headers: {
                        'Content-Type': 'application/javascript',
                        'Cache-Control': 'public, max-age=86400'
                    },
                });
            }

            if (path === '/src/js/tax.js') {
                return new Response(taxJs, {
                    headers: {
                        'Content-Type': 'application/javascript',
                        'Cache-Control': 'public, max-age=86400'
                    },
                });
            }

            if (path === '/src/js/converter.js') {
                return new Response(converterJs, {
                    headers: {
                        'Content-Type': 'application/javascript',
                        'Cache-Control': 'public, max-age=86400'
                    },
                });
            }

            if (path === '/src/js/bmi.js') {
                return new Response(bmiJs, {
                    headers: {
                        'Content-Type': 'application/javascript',
                        'Cache-Control': 'public, max-age=86400'
                    },
                });
            }

            if (path === '/src/js/app.js') {
                return new Response(appJs, {
                    headers: {
                        'Content-Type': 'application/javascript',
                        'Cache-Control': 'public, max-age=86400'
                    },
                });
            }

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
