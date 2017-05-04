var data_id;
$(document).ready(function() {
    if (localStorage.getItem("type") == "grid_view") {
        $("#grid").hide();
        $("#list").show();
    } else {
        $("#grid").show();
        $("#list").hide();
    }
    get_card();



    $('body').on("click", "#logout", (function() {
        $.ajax({
            url: "http://localhost:8081/logout",
            type: "POST",

            success: function(response) {
                if (response.status == false) {
                    console.log(response);
                    index();
                    // location.reload();
                }
            },
            complete: function(xhr, status) {
                console.log("the request is complete!");
            },
        });
    }));



    $('body').on("click", "#done", (function() {
        console.log("fsdefeds");
        var title = $("#title").val();
        var take_note = $("#take_note").val();
        console.log("assakjaskjfksdlfjkdsl");
        if (title == "" && take_note == "") {
            return;
        }
        var obj = {
            title: title,
            take_note: take_note
        };
        $("#cards").empty();
        $.ajax({
            url: "http://localhost:8081/data_card",
            type: "POST",
            dataType: "JSON",
            data: obj,
            success: function(response) {
                console.log('the page was loaded', response);
                $('span').remove();
                var a = response.message;
                console.log(a);
                get_card();
                // console.log("obj", obj);
            },
            error: function(error) {
                console.log('the page was not loaded', error);
                console.log(obj);
            }
        });
    }));



    $(document).on('click', "#p1", (function() {
        $("#div1").hide();
        $("#div2").show();
    }));


    $('body').click(function(event) {
        // console.log(event);
        if (event.target.id == "take_note" || event.target.id == "title") {
            return;
        }
        $("#div1").show();
        $("#div2").hide();
    });


    $('#title').on('keyup', function() {
        $(this).css('height', 'auto');
        $(this).height(this.scrollHeight);
    });


    $('#take_note').on('keyup', function() {
        $(this).css('height', 'auto');
        $(this).height(this.scrollHeight);
    });


    $(document).on('click', "#list", (function() {
        $("#list_cards").show();
        $("#list").hide();
        $("#grid").show();
        localStorage.setItem("type", "list_v");
        get_card();
    }));


    $(document).on('click', "#grid", (function() {
        $("#list").show();
        $("#grid").hide();
        $('#list_cards').hide();
        localStorage.setItem("type", "grid_view");
        get_card();
    }));

});



function get_card() {
    $.ajax({
        url: "http://localhost:8081/get_data_card",
        type: "POST",
        success: function(response) {
            var i = response.data_info.length - 1;
            console.log(i);
            $("#cards").html("");
            $("#list_cards").html("");
            $("#title").val("");
            $("#take_note").val("");
            $("#title").css("height", "30px");
            $("#take_note").css("height", "30px");
            for (var x = i; x >= 0; x--) {
                data_id = response.data_info[x]._id;
                data_title = response.data_info[x].title;
                data_note = response.data_info[x].take_note;
                console.log(localStorage.getItem("type"));
                if (localStorage.getItem("type") == "list_v") {
                    list_view(data_id);
                } else {
                    division(data_id);
                }
            }
        },
        complete: function(xhr, status) {
            console.log("the request is complete!");
        },
    });
}


function list_view(data_id) {
    $("#cards").css("height", "2px");
    var div = $("<pre id='innerbox1' >" + data_title + "<br>" + data_note + "<br><a onclick=delete_card('" + data_id + "') id='delete'>" + 'delete' + "</a></pre>")
    $("#list_cards").append(div);
}


function division(data_id) {
    var div = $("<pre id='innerbox' class='col-sm-3' >" + data_title + "<br>" + data_note + "<br><a onclick=delete_card('" + data_id + "') id='delete'>" + 'delete' + "</a></pre>")
    $("#cards").append(div);
    var elem = document.querySelector('#cards');
    var pckry = new Packery(elem, {
        itemSelector: '#innerbox',
        gutter: 10
    });
    pckry.getItemElements().forEach(function(itemElem) {
        var draggie = new Draggabilly(itemElem);
        pckry.bindDraggabillyEvents(draggie);
    });
}


var delete_card = function(data_id) {
    $.ajax({
        url: "http://localhost:8081/delete_data_card/" + data_id + "",
        type: "POST",
        success: function(response) {
            console.log(response);
            // $("#cards").empty();
            get_card();
        },
        complete: function(xhr, status) {
            console.log("the request is complete!");
        },
    });
}


function index() {

    $.ajax({
        url: "index.html",
        type: "GET",
        datatype: "html",
        success: function(response) {
            console.log('the page was loaded', response);
            $('body').html(response);
            console.log('the page was not loaded', response);
        },
        complete: function(xhr, status) {
            console.log("the request is complete!");
        },

    });
}
