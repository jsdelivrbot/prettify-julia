 /**
  * @license
  * Copyright (C) 2016 Alexandre Gomiero de Oliveira
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

 /**
  * @fileoverview
  *
  * Registers a language handler for Julia (http://julialang.org/).
  *
  * To use, include prettify.js and this file in your HTML page.
  * Then put your code inside an HTML tag like
  * @example
  *     <pre class="prettyprint lang-julia">
  *     </pre>
  *
  * @author gomiero@gmail.com
  * @version 0.1
  *
  * @see https://github.com/gomiero/prettify-julia
  */

(function(PR) {
    // lexer for string interpolation
    PR['registerLangHandler'](
        PR['createSimpleLexer'](
            [
            ],
            [
                // Ignored rules
                [PR['PR_SOURCE'], /^\bSSSOURCEEE\b/],
                [PR['PR_ATTRIB_VALUE'], /^\bAAATTRIBUTEVALUEEE\b/],

                // Default interpolated member
                [PR['PR_ATTRIB_NAME'], /^\$\(.+?\)/],

                // Default string
                [PR['PR_STRING'], /^[^\$]*/],

            ]
        ), ['julia-strings']);

    // Main lexer
    PR['registerLangHandler'](
        PR['createSimpleLexer'](
            [
                // Whitespace
                [PR['PR_PLAIN'], /^[\t\n\r \xA0]+/, null, '\t\n\r \xA0'],
                // Generic type
                [PR['PR_TYPE'], /^\{[^\}]+\}/]
            ],
            [
                // Single-line comments.
                [PR['PR_COMMENT'], /^\#(?!\=)(?:.*)/],
                // Multi-line comments.
                [PR['PR_COMMENT'], /^\#\=[\s\S]*?\=\#/],

                // Constants
                [PR['PR_DECLARATION'], /(?:π|γ|φ|Inf|Inf32|Inf16|NaN|NaN32|NaN16)/],

                // Types
                [PR['PR_TYPE'], /^\:{2}(.+?)\b/],
                //
                [PR['PR_TYPE'], /^(?:Array|Matrix|Vector|Union|Type|Tuple|Vararg|Ptr|Ref|Val|Nullable)(\{.+\})/],
                // Primitive Types
                // Integers
                [PR['PR_TYPE'], /^\b(?:Bool|Int8|UInt8|Int16|UInt16|Int32|UInt32|Int64|UInt64|Int128|UInt128|Int|UInt|Integer|Signed|Unsigned)\b/i],
                // Floats
                [PR['PR_TYPE'], /^\b(?:Rational|Real|AbstractFloat|Float16|Float32|Float64)\b/i],
                // Complex
                [PR['PR_TYPE'], /^\b(?:Complex128|Complex64|Complex)\b/i],
                // Big Numbers
                [PR['PR_TYPE'], /^\b(?:BigInt|BigFloat)\b/i],
                // C Types
                [PR['PR_TYPE'], /^\b(?:Cuchar|Cshort|Cushort|Cint|Cuint|Clonglong|Culonglong|Cintmax_t|Cuintmax_t|Cfloat|Cdouble|Cptrdiff_t|Cssize_t|Csize_t|Cchar|Clong|Culong|Cwchar_t)\b/i],
                // Strings
                [PR['PR_TYPE'], /^\b(?:Char|ASCIIString|UTF8String|ByteString|SubString|Regex|RegexMatch)\b/],
                // Arrays
                [PR['PR_TYPE'], /^\b(?:DArray|AbstractArray|AbstractVector|AbstractMatrix|AbstractSparseMatrix|SubArray|StridedArray|StridedVector|StridedMatrix|VecOrMat|StridedVecOrMat|DenseArray|SparseMatrixCSC|BitArray")\b/i],
                // Ranges
                [PR['PR_TYPE'], /^\b(?:Range|OrdinalRange|StepRange|UnitRange|FloatRange)\b/i],
                // Tuples
                [PR['PR_TYPE'], /^\b(?:Tuple|NTuple|Vararg)\b/i],
                //
                [PR['PR_TYPE'], /^\b(?:Ptr|Void|Exception|Task|Dict|IO|IOStream|Set|IntSet|Expr|WeakRef|ObjectIdDict)\b/i],
                // Derived Types
                [PR['PR_TYPE'], /^\b(?:Number|Associative|MersenneTwister|Rational|AbstractRNG|Symbol|DataType|Any)\b/i],

                // Macros
                [PR['PR_ATTRIB_NAME'], /^(?:\@.+?)\b/i],

                // Multi-line strings
                ['lang-julia-strings', /^((?:"(?=")"(?=")")[\s\S]*?(?:"(?=")"(?=")"))/],
                // Single-line strings
                ['lang-julia-strings', /^((?:"(?!"))[^\"]+(?:"(?!")))/],

                // Keywords
                [PR['PR_KEYWORD'], /^\b(?:function|type|immutable|macro|quote|abstract|bitstype|typealias|module|baremodule|new)\b/],

                [PR['PR_KEYWORD'], /^\b(?:if|else|elseif|while|for|in|begin|let|end|do|try|catch|finally|return|break|continue)\b/],

                [PR['PR_KEYWORD'], /^\b(?:global|local|const|export|import|importall|using)\b/],

                // Literals
                [PR['PR_LITERAL'], /^\b(?:true|false|nothing)\b/],

                [PR['PR_LITERAL'], /^\b\d+im/i],

                [PR['PR_LITERAL'], /^\b\d+(?:\.\d*)?(?:e[\+\-]?\d+)?/i],

                // Vectorized Operators
                [PR['PR_PUNCTUATION'], /^(?:\.(?:\+|\-|\*|\/|\\|\^|==|\!=|\<|\<=|\>|\>=|≤|≥))/],
                // Updating operators
                [PR['PR_PUNCTUATION'], /^(?:\+=|\-=|\*=|\/=|\\=|÷=|\%=|\^=|\&=|\|=|\$=|\>\>\>=|\>\>=|\<\<=)/],
                // Bitwise Operators
                [PR['PR_PUNCTUATION'], /^(?:\~|\&|\||\$|\>\>\>|\>\>|\<\<)/],
                // Numeric Comparisons
                [PR['PR_PUNCTUATION'], /^(?:\=\=|\!=|\≠|\<|\<=|≤|\>|\>=|≥)/],
                // Arithmetic Operators
                [PR['PR_PUNCTUATION'], /^(?:\+|\-|\*|\/|\\|\^|\%|\!|√|∛)/],
                // Separators
                [PR['PR_PUNCTUATION'], /^(?:\,|\;|\.\.\.|\-\>|\-\-\>|=|\:|\:\:|\<\:|\:\>|≡)/],
                // Transpose
                [PR['PR_PUNCTUATION'], /^'/],

                [PR['PR_TAG'], /^(?:\(|\)|\[|\])/],
                // Identifiers.
                [PR['PR_PLAIN'], /^[a-z_$][a-z0-9_]*/i]
            ]
        ), ['julia']);
})(window['PR']);
