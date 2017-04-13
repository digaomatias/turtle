var nextMovement = [new NorthMovement(), new EastMovement(), new SouthMovement(), new WestMovement()];

function walk(steps) {
    var edges = [];
    var turtle = new Turtle();
    var old_position = turtle.current_position;

    var steps_crossed = [];

    for(var i = 0; i < steps.length; i++) {
        var movement_index = turn_clockwise(current_position.facing);
        turtle.setMovement(nextMovement[movement_index]);
        var new_position = turtle.move(steps);  
        var new_edge = get_edge(old_position, new_position);
        edges.push(new_edge);

        var last_check = 4;
        if (positions.length == last_check) {
            //A partir desse momento pode cruzar um caminho
            if(positions[last_check-1].x < positions[last_check-4].x)
                if(new_position.y >= positions[0].y)
                    steps_crossed.push(i+1);
        }
    }
}

function get_edge(positionA, positionB) {
    var weight = positionA.y;
    var edge = { weight: weight };
    
    if(positionA.y != positionB.y) {
        edge.weight = positionA.x;
        
        edge.range = get_range(positionA.y, positionB.y);        
        return edge;
    }

    edge.range = get_range(positionA.x, positionB.x);
    return edge;    
}

function get_range(intA, intB) {
    if(intA > intB)
        return { from: intB, to: intA};
    
    return { from: intA, to: intB};
}

var Turtle = function() {
    this.movement = "";
    this.current_position = {x: 0, y: 0, facing: 'north'};
}

Turtle.prototype = {
    setMovement: function(movement) {
        this.movement = movement;
    },

    getCurrentPosition: function() {
        return this.current_position;
    },

    move: function(steps) {
        this.current_position = this.movement.move(position, steps);
        return this.current_position;
    },

    turn_clockwise: function () {
        var nextMovement = ['north', 'east', 'south', 'west'];
        var position_index = cardinals.indexOf(this.current_position.facing);

        if(position_index == cardinals.length -1)
            return 0;
        
        return position_index + 1; 
    }
}

var NorthMovement = function() { 

    this.move = function(position, steps) {
        position.y += steps;

        return position;
    }
}

var SouthMovement = function() { 

    this.move = function(position, steps) {
        position.y -= steps;

        return position;
    }
}

var EastMovement = function() { 

    this.move = function(position, steps) {
        position.x += steps;

        return position;
    }
}

var WestMovement = function() { 

    this.move = function(position, steps) {
        position.x -= steps;

        return position;
    }
}