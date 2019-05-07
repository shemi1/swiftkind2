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