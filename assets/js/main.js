$(document).ready(function() {
    //triggers navbar's menu to open or close

    var cameraPositionZ = 9000;
    $('.loading').addClass('site-loading');

    setTimeout(function() {
        cameraPositionZ = 30000;
        //hides the loading screen
        $('.loading').removeClass('site-loading');

        //displays the contents of the body after the loading screen
        $('body').addClass('site-loaded');

        //triggers the menu bar animation
        $('.menu-toggle').on('click', function() {
            $('body').toggleClass('menu-open');
        });

        // initialize swiper rtl
        var swiper__generic = new Swiper('.swiper__generic', {


            pagination: {
                el: '.swiper-pagination',
                type: 'fraction',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                2500: {
                    slidesPerView: 1,
                    spaceBetween: 55,
                    loop: true
                },
                1440: {
                    slidesPerView: 'auto',
                    spaceBetween: 55,
                    loop: true
                },
                1200: {
                    slidesPerView: 'auto',
                    spaceBetween: 55,
                    loop: true
                },
                1024: {
                    slidesPerView: 1,
                    spaceBetween: 55,
                },
                768: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                320: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    centeredSlides: true,
                }
            }
        });

        //services slider

        // var testimony = new Swiper('.services--swiper', {
        //     pagination: {
        //         el: '.swiper-pagination'
        //     },
        // });
        //testimony slider

        var testimony = new Swiper('.testimony--swiper', {
            pagination: {
                el: '.swiper-pagination'
            },
        });

        //project screens slider
        var project__screen = new Swiper('.project__screen', {
            pagination: {
                el: '.swiper-pagination'
            },
            loop: true,

            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            breakpoints: {
                1440: {
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    spaceBetween: 50,
                },
                320: {
                    slidesPerView: 1,
                    centeredSlides: true,
                    spaceBetween: 0,
                }
            }

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


        //initialize wow js

        wow = new WOW({
            boxClass: 'wow', // default
            animateClass: 'animated', // default
            offset: 0, // default
            mobile: true,
            live: true // default
        })
        wow.init();

        //initialize stickybits

        // $('.sticky').stickybits({
        //     useStickyClasses: true,
        //     stickyBitStickyOffset: 300
        // });


        //initialize rellax js

        var rellax = new Rellax('.rellax');

        (function() {

            var c = document.getElementById('bubbles'),
                randomN = function(start, end) {
                    return Math.random() * end + start;
                },
                i = 0,
                generateBubble = function() {
                    if (i < 60) {
                        var el = document.createElement('div'),
                            size = randomN(2, 7);
                        el.setAttribute('style', 'width: ' + size + 'px; height: ' + size + 'px; left:' + randomN(1, c.offsetWidth - (size + 4)) + 'px;');
                        c.appendChild(el);
                        i++;
                    } else {
                        clearInterval(inter);
                    }
                };

            generateBubble();

            var inter = setInterval(generateBubble, 200);

        })();



    }, 2000);
    //Animating the Small Dot Cursor

    // set the starting position of the cursor outside of the screen
    let clientX = -100;
    let clientY = -100;
    const innerCursor = document.querySelector(".cursor--small");

    const initCursor = () => {
        // add listener to track the current mouse position
        document.addEventListener("mousemove", e => {
            clientX = e.clientX;
            clientY = e.clientY;
        });

        // transform the innerCursor to the current mouse position
        // use requestAnimationFrame() for smooth performance
        const render = () => {
            innerCursor.style.transform = `translate(${clientX}px, ${clientY}px)`;
            // if you are already using TweenMax in your project, you might as well
            // use TweenMax.set() instead
            // TweenMax.set(innerCursor, {
            //   x: clientX,
            //   y: clientY
            // });

            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
    };

    initCursor();


    //Setting up the Circle on Canvas


    let lastX = 0;
    let lastY = 0;
    let isStuck = false;
    let showCursor = false;
    let group, stuckX, stuckY, fillOuterCursor;

    const initCanvas = () => {
        const canvas = document.querySelector(".cursor--canvas");
        const shapeBounds = {
            width: 75,
            height: 75
        };
        paper.setup(canvas);
        const strokeColor = "#01d9b6";
        const strokeWidth = 1;
        const segments = 8;
        const radius = 15;

        // we'll need these later for the noisy circle
        const noiseScale = 150; // speed
        const noiseRange = 4; // range of distortion
        let isNoisy = false; // state

        // the base shape for the noisy circle
        const polygon = new paper.Path.RegularPolygon(
            new paper.Point(0, 0),
            segments,
            radius
        );
        polygon.strokeColor = strokeColor;
        polygon.strokeWidth = strokeWidth;
        polygon.smooth();
        group = new paper.Group([polygon]);
        group.applyMatrix = false;

        const noiseObjects = polygon.segments.map(() => new SimplexNoise());
        let bigCoordinates = [];

        // function for linear interpolation of values
        const lerp = (a, b, n) => {
            return (1 - n) * a + n * b;
        };

        // function to map a value from one range to another range
        const map = (value, in_min, in_max, out_min, out_max) => {
            return (
                ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
            );
        };

        // the draw loop of Paper.js 
        // (60fps with requestAnimationFrame under the hood)
        paper.view.onFrame = event => {
            // using linear interpolation, the circle will move 0.2 (20%)
            // of the distance between its current position and the mouse
            // coordinates per Frame
            lastX = lerp(lastX, clientX, 0.2);
            lastY = lerp(lastY, clientY, 0.2);
            group.position = new paper.Point(lastX, lastY);
        }
    }

    initCanvas();

    const initHovers = () => {

        // find the center of the link element and set stuckX and stuckY
        // these are needed to set the position of the noisy circle
        const handleMouseEnter = e => {
            const navItem = e.target;
            const navItemBox = navItem.getBoundingClientRect();
            stuckX = Math.round(navItemBox.left + navItemBox.width / 2);
            stuckY = Math.round(navItemBox.top + navItemBox.height / 2);
            isStuck = true;

            var imgLink = $(navItem).hasClass('img-link');
            var link = $(navItem).hasClass('link');
            $('.main').addClass('link-hovered');
            if (imgLink == true) {
                $('.cursor').addClass('detail-hovered');
            }




        };

        // reset isStuck on mouseLeave
        const handleMouseLeave = () => {
            isStuck = false;
            $('main').removeClass('detail-hovered');
            $('.cursor').removeClass('detail-hovered');
        };

        // add event listeners to all items
        const linkItems = document.querySelectorAll("a");
        // const btnItems = document.querySelectorAll(".btn");
        linkItems.forEach(item => {
            item.addEventListener("mouseenter", handleMouseEnter);
            item.addEventListener("mouseleave", handleMouseLeave);
        });

    };

    initHovers();


    var screen = $(window).width();

    //calls drawdots whenever screen is not ipad/tablet
    var is_iPad = navigator.userAgent.match(/iPad/i) != null;
    if (is_iPad == false) {
        drawDots();
    }

    //draws particles on html
    function drawDots() {
        if (WEBGL.isWebGLAvailable() === false) {
            document.body.appendChild(WEBGL.getWebGLErrorMessage());
        }
        var container;
        var camera, scene, renderer;
        var spheres = [];
        var mouseX = 0;
        var mouseY = 0;
        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        init();
        animate();

        function init() {
            container = document.createElement('div');
            document.body.appendChild(container);
            camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 100000);
            camera.position.z = 9000;
            scene = new THREE.Scene();
            scene.background = new THREE.Color().setHSL(1, 1, 1);
            var geometry = new THREE.SphereBufferGeometry(10, 2, 16);
            var material = new THREE.MeshBasicMaterial({ color: '#d8dde5' });
            for (var i = 0; i < 200; i++) {
                var mesh = new THREE.Mesh(geometry, material);
                mesh.position.x = Math.random() * 10000 - 5000;
                mesh.position.y = Math.random() * 10000 - 5000;
                mesh.position.z = Math.random() * 10000 - 5000;
                mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
                scene.add(mesh);
                spheres.push(mesh);
            }
            //
            renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            container.appendChild(renderer.domElement);
            //
            window.addEventListener('resize', onWindowResize, false);
        }

        function onWindowResize() {
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function onDocumentMouseMove(event) {
            mouseX = (event.clientX - windowHalfX) * 100;
            mouseY = (event.clientY - windowHalfY) * 100;
        }
        //
        function animate() {
            requestAnimationFrame(animate);
            render();
        }

        function render() {
            var timer = 0.00002 * Date.now();
            for (var i = 0, il = spheres.length; i < il; i++) {
                var sphere = spheres[i];
                sphere.position.x = 5000 * Math.cos(timer + i);
                sphere.position.y = 5000 * Math.sin(timer + i * 1.1);
            }
            camera.position.x += (mouseX - camera.position.x) * .05;
            camera.position.y += (-mouseY - camera.position.y) * .05;
            camera.lookAt(scene.position);
            renderer.render(scene, camera);
        }
    }

});