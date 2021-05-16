//     H
//  U M A N
//    R 0
//     0
//   B   T



/*  Show next input box once there are 2 characters   */
//  inputBox = the current input-field being typed into
//  nextBox is the next field that should become visible
function showBox(inputBox, nextBox) {
    var inputBoxLength = document.getElementById(inputBox).value.length;
    var nextBoxDisplay = document.getElementById(nextBox);

    if (inputBoxLength == 2) {
        nextBoxDisplay.className += " box-display"; //show next input textbox
        return true;

    } else if (inputBoxLength > 2) {
        return true;

    } else {
        return false;
    }
}


//  Show next input box once content is pasted
function showBoxPaste(nextBox) {
    document.getElementById(nextBox).className += " box-display";
}







/* Clear input textboxes (for browser back cashe) */
window.addEventListener("pageshow", () => {
    //const inputs = document.querySelectorAll('input[type="text"]');
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(function (input) {

        input.value = '';

    });
}, false);






/*  Connect Button */
function connectBtn() {

    document.getElementById('connectBtn').style.display = 'none'; //hide button
    document.getElementById('connectBtn').style.color = "#8C8C8C"; //change color to lt gray

    //
    document.getElementById('connectForm').style.display = 'block'; //show contact form
    document.getElementById('yourName').style.display = 'block'; //show first input
    document.getElementById('yourName').focus(); //focus on name input

}







/*  Increase the width of inputboxes as text increases */
//  From: https://stackoverflow.com/a/49982135/104380
var getInputValueWidth = (function () {
    function copyNodeStyle(sourceNode, targetNode) {
        var computedStyle = window.getComputedStyle(sourceNode);
        Array.from(computedStyle).forEach(key => targetNode.style.setProperty(key, computedStyle.getPropertyValue(key), computedStyle.getPropertyPriority(key)))
    }

    function createInputMeassureElm(inputelm) {
        // create a dummy input element for measurements
        var meassureElm = document.createElement('span');
        // copy the read input's styles to the dummy input
        copyNodeStyle(inputelm, meassureElm);

        // set hard-coded styles needed for propper meassuring 
        meassureElm.style.width = 'auto';
        meassureElm.style.position = 'absolute';
        meassureElm.style.left = '-9999px';
        meassureElm.style.top = '-9999px';
        meassureElm.style.whiteSpace = 'pre';

        meassureElm.textContent = inputelm.value || '';

        // add the meassure element to the body
        document.body.appendChild(meassureElm);

        return meassureElm;
    }

    return function () {
        return createInputMeassureElm(this).offsetWidth;
    }
})();


// delegated event binding
document.body.addEventListener('input', onInputDelegate)

function onInputDelegate(e) {
    if (e.target.classList.contains('autoSize'))
        e.target.style.width = getInputValueWidth.call(e.target) + 'px';
}

for (let input of document.querySelectorAll('input'))
    onInputDelegate({
        target: input
    })






/* Increase the height of Text area box once it reaches a certain amount of columns */
function do_resize(textbox) {

    var maxrows = 6;
    var txt = textbox.value;
    var cols = textbox.cols;

    var arraytxt = txt.split('\n');
    var rows = arraytxt.length;

    for (i = 0; i < arraytxt.length; i++)
        rows += parseInt(arraytxt[i].length / cols);

    if (rows > maxrows) textbox.rows = maxrows;
    else textbox.rows = rows;
}






/* Custom Inline Cursor */
$(document).mousemove(function (e) {
    const cursor = $('#cursor');
    const target = $(event.target);

    // update position of cursor
    cursor.css('left', e.pageX).css('top', e.pageY - scrollY);

    const isLinkTag = target.is('input') || target.is('textarea');
    const isHovered = cursor.hasClass('hoveredCursor');
    const isHoverable = target.hasClass('form-control'); //This is so the submit input button doesn't change cursor


    // toggle the cursor class if necessary
    if (isLinkTag && !isHovered && isHoverable) {
        cursor.addClass('hoveredCursor');
    } else if (!isLinkTag && isHovered) {
        cursor.removeClass('hoveredCursor');
    }

});

$(document).mouseleave(function (e) {
    const cursor = $('#cursor');
    cursor.hide();
});

$(document).mouseenter(function (e) {
    const cursor = $('#cursor');
    cursor.show();
});






/* Check Form Validity */

(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                } else {


                    event.preventDefault();
                    $("#imgContainer").animate({
                        width: "100vw",
                        height: "100vh",
                        opacity: "1"
                    }, {
                        complete: function () {
                            $("form[name='connect']").submit();
                        }
                    });

                }

                form.classList.add('was-validated')
            }, false)
        })
})();






/* Generate random text illustrations on delete */
var txtarea = document.getElementById('textarea');
carotEnd(txtarea);

var textArray = new Array();
var random, x;
textArray[0] = "<br/>H<br/>U&nbsp;M&nbsp;A&nbsp;N<br/>R&nbsp;O<br/>B<br/>O&nbsp;&nbsp;&nbsp;T"; //logo
textArray[1] = "<br/>H&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;U<br/>M&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;N<br/>R&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;O<br/>B&nbsp;&nbsp;&nbsp;&nbsp;O<br/>T"; //heart
textArray[2] = "<br/><br/>H&nbsp;U&nbsp;M&nbsp;A&nbsp;N<br/>R&nbsp;O&nbsp;B&nbsp;O&nbsp;T"; //Stacked
textArray[3] = "<br/><br/>H&nbsp;U&nbsp;M&nbsp;A&nbsp;N&nbsp;R&nbsp;O&nbsp;B&nbsp;O&nbsp;T"; //Horizontal


//textArray[2] = "<br/>H<br/>U&nbsp;&nbsp;M<br/>A&nbsp;&nbsp;N&nbsp;&nbsp;R<br/>O&nbsp;&nbsp;B&nbsp;&nbsp;O&nbsp;&nbsp;T<br/>"; //triangle
//textArray[3] = "<br/>H&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;R<br/>U&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;O<br/>M&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B<br/>A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;O<br/>N&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;T"; //LINES
//textArray[4] = "<br/>H&nbsp;&nbsp;U&nbsp;&nbsp;M&nbsp;&nbsp;A&nbsp;&nbsp;N<br/><br/>R&nbsp;&nbsp;O&nbsp;&nbsp;B&nbsp;&nbsp;O&nbsp;&nbsp;T"; //HZ
//textArray[5] = "<br/>H&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;U&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;M&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;N<br/><br/>R&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;O&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;O&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;T"; //PATTERN




txtarea.addEventListener('keyup', function () {
    txtarea = document.getElementById('textarea');
    if (txtarea.textContent == 0) {

        random = Math.floor(Math.random() * textArray.length);
        while (random == x) {
            random = Math.floor(Math.random() * textArray.length);
        }

        x = random;

        txtarea.classList.add("text-center");
        txtarea.innerHTML = textArray[random];
        //txtarea.insertAdjacentHTML("<p class="text-center">H<br/>U&nbsp;M&nbsp;A&nbsp;N<br/>R&nbsp;O<br/>B<br/>O&nbsp;&nbsp;&nbsp;T</p>");

    } else {
        return false;
    }

    carotEnd(txtarea);


}, false);







/*Set caret to end of text */
function carotEnd(contenteditable) {
    contenteditable.focus();
    // select all the content in the element
    document.execCommand('selectAll', false, null);
    // collapse selection to the end
    document.getSelection().collapseToEnd();
}


//Move the caret to the end of the text
//https://css-tricks.com/snippets/javascript/move-cursor-to-end-of-input/
/*function moveCursorToEnd(id) {
    var el = document.getElementById(id)
    el.focus()
    if (typeof el.selectionStart == "number") {
        el.selectionStart = el.selectionEnd = el.value.length;
    } else if (typeof el.createTextRange != "undefined") {
        var range = el.createTextRange();
        range.collapse(false);
        range.select();
    }
}*/






/*  Play/Pause Video Button */
var playPauseBtn = document.getElementById('playPauseButton');

$('.pause-btn').show();
$('.play-btn').hide();
playPauseBtn.addEventListener('click', function () {
    var mediaPlayer = document.getElementById('bgvid');
    if (mediaPlayer.paused) {
        mediaPlayer.play();
        $('.pause-btn').show();
        $('.play-btn').hide();
        //playPauseBtn.innerHTML = "Pause";
    } else {
        mediaPlayer.pause();
        $('.play-btn').show();
        $('.pause-btn').hide();
        //playPauseBtn.innerHTML = "Play";
    }

}, false);
