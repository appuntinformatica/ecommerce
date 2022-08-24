### Create Projects Spring Boot


https://start.spring.io/ version 2.7.2

java version "17.0.4" 2022-07-19 LTS


### Create Project Angular 14

ng new frontend


### https://github.com/leelanarasimha/ngrx-counter
### https://www.youtube.com/watch?v=mg9PQ5SL6YI




### Update All Packages
npm i -g npm-check-updates
ncu -u
npm install


### https://angular.io/cli/new
ng new frontend --create-application --inline-style --inline-template --minimal --routing --skip-git --skip-tests true --style css


(oppure npm install @ngrx/{store,store-devtools,entity,effects})
ng add @ngrx/store@latest
ng add @ngrx/store-devtools@latest
ng add @ngrx/effects@latest
ng add @ngrx/router-store@latest
ng add @ngrx/entity@latest
ng add @ng-bootstrap/ng-bootstrap
npm install @fortawesome/fontawesome-free


### Angular Component
ng generate component auth --skip-tests --inline-template false --inline-style false

ng generate component home --skip-tests --inline-template false --inline-style false

ng generate component auth/authMessage --skip-tests --inline-template false --inline-style false

ng generate component shared/header --skip-tests --inline-template false --inline-style false


ng generate module posts/posts
ng generate state posts/posts
ng generate service posts/posts

ng generate component posts/post-list --skip-tests --inline-template false --inline-style false
ng generate component posts/post-edit --skip-tests --inline-template false --inline-style false

ng generate interceptor shared/auth-token


### https://getbootstrap.com/docs/5.2/examples/




### STEPS
 - package.json
	"scripts":
		"start": "ng serve --port 5000 --open",
		
		
		
		
		