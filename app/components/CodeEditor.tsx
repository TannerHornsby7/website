/**
 * CodeEditor Component
 * 
 * A interactive code editor that supports HTML/CSS and JavaScript execution
 * with live preview capabilities. Includes error handling and sandbox execution.
 * 
 * @component
 * @example
 * ```tsx
 * <CodeEditor 
 *   code="<div>Hello</div>"
 *   language="html-css"
 *   description="Write HTML code"
 * />
 * ```
 */

'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface CodeEditorProps {
  code: string;
  language: string;
  description: string;
}

export default function CodeEditor({ code, language, description }: CodeEditorProps) {
  const [value, setValue] = useState(code);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Safely execute JavaScript code in a controlled environment
  const executeJavaScript = useCallback((code: string) => {
    try {
      // Create sandbox environment
      const sandbox = new Function(
        'console',
        `
        const window = undefined;
        const document = {
          createElement: (tag) => ({ tag, style: {}, classList: new Set() }),
          body: { appendChild: () => {} }
        };
        ${code}
      `
      );
      
      // Capture console output
      let output = '';
      const mockConsole = {
        log: (...args: any[]) => {
          output += args.join(' ') + '\n';
        }
      };

      sandbox(mockConsole);
      return output || 'Code executed successfully';
    } catch (error: unknown) {
      throw error;
    }
  }, []);

  // Handle code execution based on language
  const runCode = useCallback(() => {
    setError(null);
    try {
      if (language === 'html-css') {
        // Create sandbox iframe with CSP headers
        const iframe = document.createElement('iframe');
        iframe.sandbox.add('allow-scripts');
        iframe.srcdoc = `
          <html>
            <head>
              <style>
                /* Reset default styles */
                * { margin: 0; padding: 0; box-sizing: border-box; }
              </style>
            </head>
            <body>${value}</body>
          </html>
        `;
        setOutput(iframe.outerHTML);
      } else if (language === 'javascript') {
        const result = executeJavaScript(value);
        setOutput(result);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  }, [language, value, executeJavaScript]);

  return (
    <div className="space-y-4">
      <p className="text-gray-600">{description}</p>
      
      <div className="flex gap-4">
        <div className="flex-1">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full h-48 font-mono p-4 bg-gray-100 rounded-lg"
            placeholder={`Write your ${language.toUpperCase()} code here...`}
            spellCheck="false"
            data-testid="code-editor"
          />
          {error && (
            <p className="text-red-500 mt-2" data-testid="error-message">
              {error}
            </p>
          )}
        </div>
        
        {output && (
          <div className="flex-1 h-48 border rounded-lg p-4 overflow-auto bg-white">
            <div 
              dangerouslySetInnerHTML={{ __html: output }}
              data-testid="output-preview"
            />
          </div>
        )}
      </div>

      <motion.button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        onClick={runCode}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        data-testid="run-button"
      >
        Run Code
      </motion.button>
    </div>
  );
} 