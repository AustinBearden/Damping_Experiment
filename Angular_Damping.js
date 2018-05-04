// Author: Austin Bearden
// Date Created: 5/4/2018
// Description: Angular Damping
// Organization: PhysicsFoosball
// Filename: Angular_Damping.js

//execute calcualtions when button is clicked
function calculateAll() {

    // input values:
    // 1) damping value
    // 2) initial velocity
    //get values from input boxes
    var damping_val = parseFloat(document.getElementById('dampingVal').value);
    console.log(damping_val);
    var init_velocity = parseFloat(document.getElementById('initVel').value);
    console.log(init_velocity);

    // build the world
    var world = new CANNON.World();
    world.gravity.set(0, 0, -9.82); // m/s^2

    // build a ball object
    // give the ball a shape
    var radius = 1;
    var ball = new CANNON.Body({
        mass: 5,
        position: new CANNON.Vec3(0, 0, 0),
        shape: new CANNON.Sphere(radius),
        angularVelocity: new CANNON.Vec3(init_velocity, init_velocity, init_velocity) // velocity in m / s

    });

    ball.angularDamping = damping_val; // linear damping

    // add the ball to my world
    world.addBody(ball);

    // create the plane for the world
    var ground = new CANNON.Body({
        mass: 0 // mass == 0 makes body static
                // but what does it mean to have a Static body
    });
    var ground_shape = new CANNON.Plane();
    // define the plane's shape
    ground.addShape(ground_shape);
    // add plane to world
    world.addBody(ground);

    var initial_velocity = ball.angularVelocity.x;
    console.log("BV: " + initial_velocity);

    world.step(1/5); // 0.5 seconds

    var current_velocity = ball.angularVelocity.x;
    console.log("AV: " + current_velocity);
    document.getElementById("newVel").innerHTML = "Current Velocity: " +  current_velocity + " meters per second";

}

//Accesses button from html	
var calculate = document.getElementById("calculate");
calculate.addEventListener("click", function() { calculateAll(); } );