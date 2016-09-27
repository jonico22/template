# TEMPLATE FRONTEND

## DalekJS 

Automated cross browser testing with JavaScript!

[Documentation](http://dalekjs.com/pages/getStarted.html)

### Bug phantomJS 

Solution :

1.- Do DalekJS installation as suggested

2.- install phantomjs
```sh
$ npm install phantom phantomjs -g
```
3.- Check phantomJS installation running
```sh
$ phantomjs -v
``` 
4.- Search for local phantomjs installations running 
    find . -name 'phantom*' and identify dalek's phantomjs dependency
```sh
$ find . -name 'phantom*'
``` 
5.- Delete dalek's phantomjs dependency running 
```sh
$ rm -fr ./node_modules/dalek-browser-phantomjs/node_modules/phantomjs
``` 
6.- Copy the recently installed phantomJS to the just deleted path running 
```sh
$ cp -r /usr/local/lib/node_modules/phantomjs ./node_modules/dalek-browser-phantomjs/node_modules/phantomjs
``` 
7.- Run dalek again and your tests should work.