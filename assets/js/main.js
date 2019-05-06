$(document).ready(function() {

    //triggers navbar's menu to open or close
    $('.menu-toggle').on('click', function() {
        $('body').toggleClass('menu-open');
    })

    // $(window).on('scroll', function() {
    //     var scrollTop = $(window).scrollTop();

    //     $('.svc-title').each(function(e) {
    //         var scroll = $(this).offset().top;
    //         var distance = scrollTop - scroll;

    //         var vh = 800;
    //         var rvh = (scroll + vh) - scrollTop;

    //         console.log('distance: '+ distance);
    //         console.log('scrollTop: '+ scrollTop);
    //         console.log('rvh: '+ rvh);
    //         if (distance > -300 && distance < vh) {
    //             $(this).addClass('fixed-top');
    //                 distance = 0;


    //         }
    //         if ( scrollTop > rvh) {
    //                  $(this).removeClass('fixed-top');
    //             }

    //         // if (scrollTop > 1500 || scrollTop < 1000) {

    //         // }
    //         // if (distance < 0) {
    //         //     $(this).removeClass('fixed-top');
    //         // }
    //     });


    // });

    // initialize swiper rtl
    var swiper = new Swiper('.swiper__generic', {
        slidesPerView: 1,
        spaceBetween: 55,

        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    //testimony slider

    var swiper = new Swiper('.testimony--swiper', {
        slidesPerView: 3,
        spaceBetween: 30,
        freeMode: true,
        centeredSlides: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });


    //project before redirect animation
    $('.projects--item  .more-details').on('click', function(e) {
        $(".projects--item .projects--img").toggleClass('heartBeat');
        $(".projects--item").toggleClass('redirecting');
        e.preventDefault(); //will stop the link href to call the blog page
        console.log('working');
        // setTimeout(function() {
        //     window.location.href = "index.html";
        // }, 1000);
    });


    //initialize skrollr
    var s = skrollr.init();

    //initialize inertia scroll
    // $(".box").inertiaScroll({
    //     parent: $(".page-wrapper")
    // });

    $(window).resize(function() {
        if ($(window).width() > 1024) {

        }
    })


    //initialize wow js

    var wow = new WOW({
        boxClass: 'wow', // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset: 150, // distance to the element when triggering the animation (default is 0)
        mobile: true, // trigger animations on mobile devices (default is true)
        live: true, // act on asynchronously loaded content (default is true)
        callback: function(box) {
             
        },
        scrollContainer: 'page-wrapper' // optional scroll container selector, otherwise use window
    });
    wow.init();


    //creating canvas for arrow animation on arrow movement
    // var canvas = document.getElementById('canvas');
    // var ctx = canvas.getContext('2d');
    // var width, height;
    // var forces = [],
    //     particles = [];
    // var nParticles = 250;
    // var p = 0;

    // noise.seed(Math.random());

    // class V2 {
    //     constructor(x, y) {
    //         this.x = x || 0;
    //         this.y = y || 0;
    //     }
    //     add(vector) {
    //         this.x += vector.x;
    //         this.y += vector.y;
    //     }
    //     reset(x, y) {
    //         this.x = x;
    //         this.y = y;
    //     }
    //     lerp(vector, n) {
    //         this.x += (vector.x - this.x) * n;
    //         this.y += (vector.y - this.y) * n;
    //     }
    // }


    // class Particle {
    //     constructor(x, y) {
    //         this.position = new V2(-100, -100);
    //         this.velocity = new V2();
    //         this.acceleration = new V2();
    //         this.alpha = 0;
    //         this.color = '#000000';
    //         this.points = [new V2(-10 + Math.random() * 20, -10 + Math.random() * 20),
    //             new V2(-10 + Math.random() * 20, -10 + Math.random() * 20),
    //             new V2(-10 + Math.random() * 20, -10 + Math.random() * 20)
    //         ];
    //     }

    //     update() {
    //         this.velocity.add(this.acceleration);
    //         this.position.add(this.velocity);
    //         this.acceleration.reset(0, 0);
    //         this.alpha -= 0.008;
    //         if (this.alpha < 0) this.alpha = 0;
    //     }

    //     follow() {
    //         var x = Math.floor(this.position.x / 20);
    //         var y = Math.floor(this.position.y / 20);
    //         var index = x * Math.floor(height / 20) + y;
    //         var force = forces[index];
    //         if (force) this.applyForce(force);
    //     }

    //     applyForce(force) {
    //         this.acceleration.add(force);
    //     }

    //     draw() {
    //         ctx.globalAlpha = this.alpha;
    //         ctx.beginPath();
    //         ctx.moveTo(this.position.x + this.points[0].x, this.position.y + this.points[0].y);
    //         ctx.lineTo(this.position.x + this.points[1].x, this.position.y + this.points[1].y);
    //         ctx.lineTo(this.position.x + this.points[2].x, this.position.y + this.points[2].y);
    //         ctx.closePath();
    //         ctx.fillStyle = this.color;
    //         ctx.fill();
    //     }
    // }


    // const resize = () => {
    //     width = window.innerWidth;
    //     height = window.innerHeight;
    //     canvas.width = width;
    //     canvas.height = height;
    //     initForces();
    // };

    // const initForces = () => {
    //     var i = 0;
    //     for (var x = 0; x < width; x += 20) {
    //         for (var y = 0; y < height; y += 20) {
    //             if (!forces[i]) forces[i] = new V2();
    //             i++;
    //         }
    //     }

    //     if (i < forces.length) {
    //         forces.splice(i + 1);
    //     }
    // };

    // const updateForces = t => {
    //     var i = 0;
    //     var xOff = 0,
    //         yOff = 0;
    //     for (var x = 0; x < width; x += 20) {
    //         xOff += 0.1;
    //         for (var y = 0; y < height; y += 20) {
    //             yOff += 0.1;
    //             let a = noise.perlin3(xOff, yOff, t * 0.00005) * Math.PI * 4;
    //             if (forces[i]) forces[i].reset(Math.cos(a) * 0.1, Math.sin(a) * 0.1);
    //             i++;
    //         }
    //     }
    // };

    // const initParticles = () => {
    //     for (var i = 0; i < nParticles; i++) {
    //         particles.push(new Particle(Math.random() * width, Math.random() * height));
    //         particles[i].velocity.y = 0.1;
    //     }
    // };

    // const drawParticles = () => {
    //     for (var i = 0; i < nParticles; i++) {
    //         particles[i].update();
    //         particles[i].follow();
    //         particles[i].draw();
    //     }
    // };

    // const launchParticle = () => {
    //     particles[p].position.reset(emitter.x, emitter.y);
    //     particles[p].velocity.reset(-1 + Math.random() * 2, -1 + Math.random() * 2);
    //     particles[p].color = `hsl(170, 99%, 43%, 10%)`;
    //     particles[p].alpha = 1;
    //     p++;
    //     if (p === nParticles) p = 0;
    // };

    // const updateEmitter = () => {
    //     emitter.lerp(mouse, 0.2);
    // };

    // const animate = t => {
    //     ctx.clearRect(0, 0, width, height);
    //     updateEmitter();
    //     launchParticle();
    //     launchParticle();
    //     updateForces(t);
    //     drawParticles();
    //     requestAnimationFrame(animate);
    // };

    // const pointerMove = e => {
    //     mouse.x = e.touches ? e.touches[0].pageX : e.pageX;
    //     mouse.y = e.touches ? e.touches[0].pageY : e.pageY;
    // };

    // let mouse = new V2(window.innerWidth / 2, window.innerHeight / 2);
    // let emitter = new V2(window.innerWidth / 2, window.innerHeight / 2);
    // resize();
    // initParticles();
    // requestAnimationFrame(animate);

    // window.addEventListener('resize', resize);
    // window.addEventListener('mousemove', pointerMove);
    // window.addEventListener('touchmove', pointerMove);


    //webGL
    if ( WEBGL.isWebGLAvailable() === false ) {

                document.body.appendChild( WEBGL.getWebGLErrorMessage() );

            }

            var container;

            var camera, scene, renderer;

            var spheres = [];

            var mouseX = 0;
            var mouseY = 0;

            var windowHalfX = window.innerWidth / 2;
            var windowHalfY = window.innerHeight / 2;

            document.addEventListener( 'mousemove', onDocumentMouseMove, false );

            init();
            animate();

            function init() {

                
                container = document.createElement( 'div' );
                document.body.appendChild( container );

                camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 1, 100000 );
                camera.position.z = 300;

                scene = new THREE.Scene();
                scene.background = new THREE.Color().setHSL( 1, 1, 1 );

                var geometry = new THREE.SphereBufferGeometry( 10, 2, 16 );
                var material = new THREE.MeshBasicMaterial( { color: '#ccd5e3' } );
                for ( var i = 0; i < 200; i ++ ) {
                    var mesh = new THREE.Mesh( geometry, material );

                    mesh.position.x = Math.random() * 10000 - 5000;
                    mesh.position.y = Math.random() * 10000 - 5000;
                    mesh.position.z = Math.random() * 10000 - 5000;

                    mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;

                    scene.add( mesh );

                    spheres.push( mesh );

                }


                //

                renderer = new THREE.WebGLRenderer();
                renderer.setPixelRatio( window.devicePixelRatio );
                renderer.setSize( window.innerWidth, window.innerHeight );
                container.appendChild( renderer.domElement );

                //

                window.addEventListener( 'resize', onWindowResize, false );

            }

            function onWindowResize() {

                windowHalfX = window.innerWidth / 2;
                windowHalfY = window.innerHeight / 2;

                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize( window.innerWidth, window.innerHeight );

            }

            function onDocumentMouseMove( event ) {

                mouseX = ( event.clientX - windowHalfX ) * 100;
                mouseY = ( event.clientY - windowHalfY ) * 100;

            }

            //

            function animate() {

                requestAnimationFrame( animate );

                render();

            }

            function render() {

                var timer = 0.0001 ;

                for ( var i = 0, il = spheres.length; i < il; i ++ ) {

                    var sphere = spheres[ i ];

                    sphere.position.x = 5000 * Math.cos( timer + i );
                    sphere.position.y = 5000 * Math.sin( timer + i * 1.1 );

                }

                camera.position.x += ( mouseX - camera.position.x ) * .05;
                camera.position.y += ( - mouseY - camera.position.y ) * .05;

                camera.lookAt( scene.position );

                renderer.render( scene, camera );

            }
});