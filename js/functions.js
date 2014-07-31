
function moveUp(steps) {
    
    var pos = getKnightPos();
    var knight = $('.game .knight');
    if (steps === undefined) {
        steps = 1;
    } else {
        steps = Math.floor(steps);
    }

    var clear_path = true;
    
    for (var i = 1; i <= steps; i++) {
        checkPossition(pos['x'], pos['y'] - i);
        
        if(checkCoordinates(pos['x'], pos['y'] - i) === false) {
            clear_path = false;
        }
    }

    if (clear_path === true) {
        pos['y'] -= steps;

        var top = parseInt(knight.css('top').slice(0, -2));

        knight.animate({
            top: top - (box_size * steps)
        });

        var pos_str = pos['x'] + '-' + pos['y'];
        knight.attr('pos', pos_str);
    }
}

function moveDown(steps) {

    var pos = getKnightPos();
    var knight = $('.game .knight');
    if (steps === undefined) {
        steps = 1;
    } else {
        steps = Math.floor(steps);
    }

    var clear_path = true;
    
    for (var i = 1; i <= steps; i++) {
        checkPossition(pos['x'], pos['y'] + i);
        
        if(checkCoordinates(pos['x'], pos['y'] + i) === false) {
            clear_path = false;
        }
    }

    if (clear_path === true) {
        pos['y'] += steps;

        var top = parseInt(knight.css('top').slice(0, -2));

        knight.animate({
            top: top + (box_size * steps)
        });

        var pos_str = pos['x'] + '-' + pos['y'];
        knight.attr('pos', pos_str);
    }
}

function moveLeft(steps) {

    var pos = getKnightPos();
    var knight = $('.game .knight');
    if (steps === undefined) {
        steps = 1;
    } else {
        steps = Math.floor(steps);
    }

    var clear_path = true;
    
    for (var i = 1; i <= steps; i++) {
        checkPossition(pos['x'] - i, pos['y']);
        
        if(checkCoordinates(pos['x'] - i, pos['y']) === false) {
            clear_path = false;
        }
    }

    if (clear_path === true) {
        pos['x'] -= steps;

        var left = parseInt(knight.css('left').slice(0, -2));

        knight.animate({
            left: left - (box_size * steps)
        });

        var pos_str = pos['x'] + '-' + pos['y'];
        knight.attr('pos', pos_str);
    }
}

function moveRight(steps) {

    var pos = getKnightPos();
    var knight = $('.game .knight');
    if (steps === undefined) {
        steps = 1;
    } else {
        steps = Math.floor(steps);
    }

    var clear_path = true;
    
    for (var i = 1; i <= steps; i++) {
        checkPossition(pos['x'] + i, pos['y']);
        
        if(checkCoordinates(pos['x'] + i, pos['y']) === false) {
            clear_path = false;
        }
    }

    if (clear_path === true) {
        pos['x'] += steps;

        var left = parseInt(knight.css('left').slice(0, -2));

        knight.animate({
            left: left + (box_size * steps)
        });

        var pos_str = pos['x'] + '-' + pos['y'];
        knight.attr('pos', pos_str);
        checkPossition(pos['x'], pos['y']);
    }
}

function attack() {
    
    var pos = getKnightPos();
    var monster = '';
    
    if(levels[current_level][pos['x']][pos['y']+1] === 'monster') {
        monster = pos['x']+'-'+(pos['y']+1);
        levels[current_level][pos['x']][pos['y']+1] = v;
    } else if(levels[current_level][pos['x']][pos['y']-1] === 'monster') {
        monster = pos['x']+'-'+(pos['y']-1);
        levels[current_level][pos['x']][pos['y']-1] = v;
    } else if(levels[current_level][pos['x']+1][pos['y']] === 'monster') {
        monster = (pos['x']+1)+'-'+pos['y'];
        levels[current_level][pos['x']+1][pos['y']] = h;
    } else if(levels[current_level][pos['x']-1][pos['y']] === 'monster') {
        monster = (pos['x']-1)+'-'+pos['y'];
        levels[current_level][pos['x']-1][pos['y']] = h;
    }
    
    var cPos = levels[current_level][pos['x']][pos['y']];
    
    if(cPos === 'horizontal' || cPos === 'bot-right' || cPos === 'bot-left') {
        $('#'+monster).removeClass('monster').addClass('horizontal');
    } else if(cPos === 'vertical' || cPos === 'top-right' || cPos === 'top-left') {
        $('#'+monster).removeClass('monster').addClass('vertical');
    }
    
}