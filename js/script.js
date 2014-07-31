var current_level = parseInt(localStorage.getItem('current_level'));
//localStorage.setItem('current_level', 1);
if(!current_level)
    current_level = 1;
var last_command = '';


$(document).ready(function() {

    render(current_level);

    $('.console .commands p').html(commands[current_level].join('</br>'));

    $('.console').click(function() {
        $('.console input').focus();
    });

    $('.popup_mask a.restart').click(function() {
        location.reload();
    });

    $('.popup_mask a.next').click(function() {
        localStorage.setItem('current_level', current_level+1);
        location.reload();
    });
    
    $('.popup_mask a.clear').click(function() {
        localStorage.setItem('current_level', 1);
        location.reload();
    });

    var console_history = getConsoleHistory();
    if (console_history) {
        $('.console .cmd p').html(console_history);
    }

    // KEY LISTENER
    window.onkeypress = function(e) {
        var key = e.keyCode ? e.keyCode : e.which;

        if (key === 13) {

            if ($('.console input').is(':focus')) {
                var command = $('.console input').val();

                if (command !== '') {
                    last_command = command;
                    addConsoleHistory(command);

                    var validate_command = isCommandExists(command);

                    if (validate_command === true) {

                        var cmd = command.split(/[()]/);

                        eval(command);

                    } else if (validate_command === false) {
                        addConsoleHistory('There are no command: ' + command);
                    } else {
                        addConsoleHistory(validate_command);
                    }

                    $('.console input').val('');
                }
            }

        } else if (key === 38) {
            $('.console input').val(last_command);
        }
    };
});

function render(level) {

    var knight = false;
    for (var i = 0; i < x; i++) {
        for (var j = 0; j < y; j++) {

            if (levels[level][i][j] !== undefined) {

                var path = levels[level][i][j];
                if (knight === false) {
                    $('.game').append('<div class="knight" pos="' + i + '-' + j + '"></div>');
                    $('.game .knight').css('top', (j * box_size) + 'px').css('left', (i * box_size) + 'px');
//                    $('.game').append('<div class="knight" pos="10-2"></div>');
//                    $('.game .knight').css('top', (2 * box_size) + 'px').css('left', (10 * box_size) + 'px');
                    knight = true;
                }

                $('.game').append('<div class="block ' + path + '" id="' + i + '-' + j + '"></div>');
                $('.game #' + i + '-' + j).css('top', (j * box_size) + 'px').css('left', (i * box_size) + 'px');
            }
        }
    }

}

function getConsoleHistory() {
    var c_history = $('.console .cmd p').html();

    return c_history;
}

function addConsoleHistory(new_row) {
    var console_history = getConsoleHistory();

    var full_history = '';
    if (console_history) {
        full_history = console_history + '<br/>' + new_row;
    } else {
        full_history = new_row;
    }

    $('.console .cmd p').html(full_history);
}

function isCommandExists(command) {

    var exists = false;
    var error = '';

    var cmd = command.split(/[()]/);

    for (var i = 0; i < commands[current_level].length; i++) {

        var ccmd = commands[current_level][i].split(/[()]/);

        if (cmd[0] === ccmd[0] && cmd[2] === ';') {

            if (isNaN(cmd[1])) {
                error = 'function parameter must be integer';
            } else {
                exists = true;
                break;
            }
        }
    }

    if (error) {
        return error;
    } else {
        return exists;
    }
}

function getKnightPos() {

    var pos = {};
    var knight_pos = $('.game .knight').attr('pos').split('-');

    pos['x'] = parseInt(knight_pos[0]);
    pos['y'] = parseInt(knight_pos[1]);
    
    return pos;
}

function checkCoordinates(xPos, yPos) {
    
    if(levels[current_level][xPos][yPos]) {
        return true;
    } else {
        return false;
    }
}

function checkPossition(xPos, yPos) {
    var pos = levels[current_level][xPos][yPos];
    console.log(pos);
    console.log(xPos, yPos);
    
    if(pos === 'temple') {
        loadPopup('Level ' + current_level + ' complete !', 'popup');
    } else if(pos === 'monster') {
        loadPopup('The brave knight was killed by monster !', 'gameover');
    } else if(pos === 'princess') {
        loadPopup('Congratulations you save the princess !', 'popup');
    }
}

function loadPopup(message, popup) {
    
    $('.popup_mask p').html(message);
    $('.popup_mask').show();
    
    if(popup === 'gameover') {
        $('.gameover').show();
    } else if(popup === 'popup') {
        $('.popup').show();
        if(current_level == lvls) {
            $('.popup a.next').hide();
            showInlineBlock($('.popup a.clear'));
        }
    }
}

function showInlineBlock(element) {
    element.css('display', 'inline-block');
}