# Nodejs API Sample


The purpose of this project is to serve as an example that shows how to structure a [Nodejs](https://nodejs.org/en/) API, using [Express](https://expressjs.com/) framework, into layers to compose a maintainable project, keeping framework, application, and domain isolated from each other.


## Folder structure

> adapters

Code that integrates application with external tools (database drivers, email integration, notification, other services), an adapter in the sense of the word.
This code is not part of the application but is required by it to execute some commands. Adapters are injected into the domain to decouple the dependency.


> boot

Contain functions that initialize and configure the application, such as configure the error handler, load routes, apply global middlewares, configure the view engine, and load application module providers.

> config

All global application configurations are available in this directory. New global configurations can be added as required.

> resources

This directory holds all assets (styles, media, client scripts) required when working with views, also all files that are available to download.

It's well known that that kind of files should be in a CDN server, and files to download in a storage server. The intention is to show how it is possible to serve files directly from the server. 

> src

This is the most important directory, it's where the application code stands.
The directory has multiple subdirectories, and each one is a module that answer for a specific application context.
Some modules (03 of them) are not related to application itself, are support modules (or core modules). 

The **core** module provides resources to the application (events, exceptions, notifier, repository decoupling, view render), they act as interfaces providing decoupling to the domain from adapters.

The **support** module has global helpers.

The last one, **maintenance**, is responsible to define how the application responds to a not defined route and health check router.

All others subdirectories are specific application logic, in this project sample, `account`, `artist` and `auth` are application domains.

Each module also follows a convention:
1. in the root of module there is a `routes` file, which exports all available routes of this module;
2. a folder named `Provider` export any initialization that is required to set up the module. This provider is loaded by `boot/app` and run at the application boot;
3. the `controller` holds the functions/controllers that handle the requests to each route;
4. the `actions` directory contains the ports for the application, they are called by `controllers` to execute a specific task in the domain;
5. when some logic is required by an `action`, and that logic is not related to solving some business problem, it's up to an `application_service` to implement that logic;
6. `entities` have all domain entities (class or functions);
7. the `events` contains all events emitted by the application or domain, also the listeners for that events;
8. `presenters` contains functions to format the output, they are used only by controllers;
9. the `repositories` directory holds all repositories implementation required by its module. By _implementation_ means to have the methods to save and query data, also work with collections. To save and query data, it uses a specific implementation that is provided to its constructor, so the save and query are just abstractions.
10. when working with views, all view templates and assets are put in `views` directory.

> test

All tests are in this directory, it follows the same folder structure as `src`, except it don't need all subfolders that are inside each module. 
