# Turbolinks Example

This mini-site is an example of how to use turbolinks with hapi.

Really, turbolinks is a client-side technique for faster page loads but I was curious what was involved 
server side to comply with it, and it turns out, not very much. 

In this example we're just serving handlebars rendered templates, with little to no JS which is a very simplistic use case.

If you were using this for an app, you could render server templates server-side from the multitude of templates languages out there
like mustache (examples of this site rendered via mustache), jade, jsx and on. 

Hopefully this example illustrates how you could build an app, where in most apps you would populate the 
`context` variable passed to the templates with data from a database.