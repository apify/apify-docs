---
title: Watch mode & tsconfig.json
description: Learn how to fine-tune TypeScript for an entire project's needs and efficiently compile numerous TS files at a single time (automagically).
menuWeight: 7.7
paths:
    - switching-to-typescript/watch-mode-and-tsconfig
---

# [](#watch-mode-and-tsconfig) Watch mode and tsconfig.json

So far, each time we've made changes to our TypeScript code, we've had to run the `tsc FILE_NAME.ts` command in terminal. Very quickly, this becomes repetitive and cumbersome, especially for large projects with more than one file. Luckily, the TypeScript compiler has a special feature called **watch mode**, which will watch a specific file (or all **.ts** files) for any changes. If any changes are made, it will automatically recompile.

> Test out watch mode on a single file by using the `--watch` (or `-w` for short) flag like so: `tsc FILE_NAME --watch`.

## [](#tsconfig) tsconfig.json

If your project has more than one file, it's a necessity to have a `tsconfig.json` file in the root of your project. This is a file which allows you to configure TypeScript to your liking, as well as utilize a "general" watch mode that watches all TS files and recompiles when changes are made.

### [](#creating-the-file) Creating the file

In the next lesson, we'll be learning how to use interfaces in combination with type casting and a few other concepts from the previous lessons by building a small project. Let's create a new directory for this project right now and call it **my-first-typescript-project**. Within the directory, we'll first initialize the project with this command:

```shell
npm init -y
```

Then, in order to tell TypeScript that this is a whole project, we'll run this command:

```shell
tsc --init
```

Notice that a new **tsconfig.json** file has been automatically created. When you open it up, here's what you'll see:

```JSON
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */

    /* Projects */
    // "incremental": true,                              /* Enable incremental compilation */
    // "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
    // "tsBuildInfoFile": "./",                          /* Specify the folder for .tsbuildinfo incremental compilation files. */
    // "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects */
    // "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
    // "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */

    /* Language and Environment */
    "target": "es2016",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    // "lib": [],                                        /* Specify a set of bundled library declaration files that describe the target runtime environment. */
    // "jsx": "preserve",                                /* Specify what JSX code is generated. */
    // "experimentalDecorators": true,                   /* Enable experimental support for TC39 stage 2 draft decorators. */
    // "emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */
    // "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h' */
    // "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
    // "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using `jsx: react-jsx*`.` */
    // "reactNamespace": "",                             /* Specify the object invoked for `createElement`. This only applies when targeting `react` JSX emit. */
    // "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
    // "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */

    /* Modules */
    "module": "commonjs",                                /* Specify what module code is generated. */
    // "rootDir": "./",                                  /* Specify the root folder within your source files. */
    // "moduleResolution": "node",                       /* Specify how TypeScript looks up a file from a given module specifier. */
    // "baseUrl": "./",                                  /* Specify the base directory to resolve non-relative module names. */
    // "paths": {},                                      /* Specify a set of entries that re-map imports to additional lookup locations. */
    // "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
    // "typeRoots": [],                                  /* Specify multiple folders that act like `./node_modules/@types`. */
    // "types": [],                                      /* Specify type package names to be included without being referenced in a source file. */
    // "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
    // "resolveJsonModule": true,                        /* Enable importing .json files */
    // "noResolve": true,                                /* Disallow `import`s, `require`s or `<reference>`s from expanding the number of files TypeScript should add to a project. */

    /* JavaScript Support */
    // "allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the `checkJS` option to get errors from these files. */
    // "checkJs": true,                                  /* Enable error reporting in type-checked JavaScript files. */
    // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from `node_modules`. Only applicable with `allowJs`. */

    /* Emit */
    // "declaration": true,                              /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
    // "declarationMap": true,                           /* Create sourcemaps for d.ts files. */
    // "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
    // "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */
    // "outFile": "./",                                  /* Specify a file that bundles all outputs into one JavaScript file. If `declaration` is true, also designates a file that bundles all .d.ts output. */
    // "outDir": "./",                                   /* Specify an output folder for all emitted files. */
    // "removeComments": true,                           /* Disable emitting comments. */
    // "noEmit": true,                                   /* Disable emitting files from a compilation. */
    // "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
    // "importsNotUsedAsValues": "remove",               /* Specify emit/checking behavior for imports that are only used for types */
    // "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
    // "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
    // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
    // "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
    // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
    // "newLine": "crlf",                                /* Set the newline character for emitting files. */
    // "stripInternal": true,                            /* Disable emitting declarations that have `@internal` in their JSDoc comments. */
    // "noEmitHelpers": true,                            /* Disable generating custom helper functions like `__extends` in compiled output. */
    // "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
    // "preserveConstEnums": true,                       /* Disable erasing `const enum` declarations in generated code. */
    // "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */
    // "preserveValueImports": true,                     /* Preserve unused imported values in the JavaScript output that would otherwise be removed. */

    /* Interop Constraints */
    // "isolatedModules": true,                          /* Ensure that each file can be safely transpiled without relying on other imports. */
    // "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables `allowSyntheticDefaultImports` for type compatibility. */
    // "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */

    /* Type Checking */
    "strict": true,                                      /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied `any` type.. */
    // "strictNullChecks": true,                         /* When type checking, take into account `null` and `undefined`. */
    // "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
    // "strictBindCallApply": true,                      /* Check that the arguments for `bind`, `call`, and `apply` methods match the original function. */
    // "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
    // "noImplicitThis": true,                           /* Enable error reporting when `this` is given the type `any`. */
    // "useUnknownInCatchVariables": true,               /* Type catch clause variables as 'unknown' instead of 'any'. */
    // "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
    // "noUnusedLocals": true,                           /* Enable error reporting when a local variables aren't read. */
    // "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read */
    // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
    // "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
    // "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
    // "noUncheckedIndexedAccess": true,                 /* Include 'undefined' in index signature results */
    // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
    // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type */
    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */

    /* Completeness */
    // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  }
}
```

### [](#bare-basic-configurations) Bare basic configurations

As you can see, there are a whole lot of options, which is quite overwhelming. Don't worry, we'll be walking you through all of the important ones, so for now let's delete all of the contents of this **tsconfig.json** and start from scratch.

#### [](#excluding-files-and-folders) Excluding files and folders

It is possible to tell TypeScript which files to compile, and which ones to ignore. The **exclude** option in **tsconfig.json** holds an array of file/folder names/paths that should **not** be watched.

```JSON
{
    "compilerOptions": {},
    "exclude": ["node_modules"]
}
```

In our case, we don't want to compile any TypeScript code that could possibly be living in the **node_modules** folder that will appear when we start installing dependencies, so we've added it to the array.

#### [](#telling-typescript-what-to-compile) Telling TypeScript which files to compile

Along with the **exclude** property is the **include** property, which holds an array of files/paths to check when compiling. Anything not included within the array will be ignored.

In the next project, we are going to follow a very common pattern with TypeScript projects by keeping all of our TS files in a folder named **src**. So, let's create a **src** folder within **my-first-typescript-project**, then add its path to the **include** property's array.

```JSON
{
    "compilerOptions": {},
    "exclude": ["node_modules"],
    "include": ["src/"]
}
```

#### [](#specify-where-to-put-compiled-files) Specify where to put compiled files

It's common practice in TypeScript projects to keep **.ts** files separate from their respective compiled **.js** files. Usually, the compiled files are placed in a folder named **dist** or **build**. Let's use **dist** for our project.

Within **compilerOptions**, the **outDir** property tells TypeScript just that - where to place all compiled files.

```JSON
{
    "compilerOptions": {
        "outDir": "dist/"
    },
    "exclude": ["node_modules"],
    "include": ["src/"]
}
```

This time, you don't have to manually create a folder named **dist**. During compile time, TypeScript will detect whether or not the folder exists and automatically create it if it doesn't.

> We also recommend learning about [**rootDir**](https://www.typescriptlang.org/tsconfig/#rootDir).

### [](#important-basic-configurations) Important basic configurations

Other than telling TypeScript **what** files it should (and should not) compile, we also need to tell it **how** they should be compiled.

#### [](#setting-the-target) Setting the target

**target** within **compilerOptions** tells TypeScript which JavaScript version you'd like to compile your code into. This allows for the ability to, for example, use ES7 features during development time, but support environments that only work with the ES3 version of JavaScript. We'll use **esnext**.

```JSON
{
    "compilerOptions": {
        "target": "esnext",
        "outDir": "dist/"
    },
    "exclude": ["node_modules"],
    "include": ["src/"]
}
```

#### [](#setting-libs) Setting libs

By default TypeScript will allow us to use things like `document.querySelector()` or `window.reload()` even though we're writing Node.js code where those global objects don't exist. This is because TypeScript automatically has these libraries enabled. In order to prevent this, we'll get more specific about the **lib**s we'd like to use.

```JSON
{
    "compilerOptions": {
        "target": "esnext",
        "lib": ["ES2015", "ES2016", "ES2018", "ES2019.Object", "ES2018.AsyncIterable", "ES2020.String", "ES2019.Array"],
        "outDir": "dist/"
    },
    "exclude": ["node_modules"],
    "include": ["src/"]
}
```

> Learn more about the **lib** configuration option [in the TypeScript documentation](https://www.typescriptlang.org/tsconfig#lib).

#### [](#removing-comments) Removing comments

This one is pretty straightforward. **removeComments** allows you to keep the comments which are useful in the code during development out of your compiled files.

```JSON
{
    "compilerOptions": {
        "target": "esnext",
        "lib": ["ES2015", "ES2016", "ES2018", "ES2019.Object", "ES2018.AsyncIterable", "ES2020.String", "ES2019.Array"],
        "outDir": "dist/",
        "removeComments": true
    },
    "exclude": ["node_modules"],
    "include": ["src/"]
}
```

#### [](#dont-compile-if-errors) Refusing to compile if there are any errors

In most statically typed programming languages, the compiler will refuse to produce an output until all errors have been fixed; however, TypeScript by default will still compile even if there are errors. To enable the more strict functionality that other languages support, set **noEmitOnError** to **true**.

```JSON
{
    "compilerOptions": {
        "target": "esnext",
        "lib": ["ES2015", "ES2016", "ES2018", "ES2019.Object", "ES2018.AsyncIterable", "ES2020.String", "ES2019.Array"],
        "outDir": "dist/",
        "removeComments": true,
        "noEmitOnError": true
    },
    "exclude": ["node_modules"],
    "include": ["src/"]
}
```

#### [](#strict-type-checking) Adding strict type checking

TypeScript has [multiple options](https://learntypescript.dev/11/l6-strictness) for strict type checking that can be configured. To enable all of them, set **strict** to **true** (this is recommended).

```JSON
{
    "compilerOptions": {
        "target": "esnext",
        "lib": ["ES2015", "ES2016", "ES2018", "ES2019.Object", "ES2018.AsyncIterable", "ES2020.String", "ES2019.Array"],
        "outDir": "dist/",
        "removeComments": true,
        "noEmitOnError": true,
        "strict": true
    },
    "exclude": ["node_modules"],
    "include": ["src/"]
}
```

## [](#watch-mode) Watch mode

Now that you've finished configuring the **tsconfig.json** file, go ahead and create an **index.ts** file in the **src** folder. Because we've configured this project with TypeScript, we can just run this command:

```shell
## -w is the shortened version of the --watch flag
tsc -w
```

And our files in **src** will automatically compile into a folder named **dist**, and one that change will be recompiled.

## [](#next) Next up

something
