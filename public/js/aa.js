    var flag=0;
    $(document).ready(function() {
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
            console.log("done", take_note);
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
                // headers:{"Content-Type":"application/json"},
                dataType: "JSON",
                data: obj,
                success: function(response) {
                    console.log('the page was loaded', response);
                    // console.log(response);
                    // console.log("my response", response);
                    $('span').remove();
                    var a = response.message;
                    console.log(a);
                    get_card();

                    console.log("sdfsadfsa");
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
            console.log(event);
            if (event.target.id == "take_note" || event.target.id == "title") {
                return;
            }
            // $("#take_note").hide();
            $("#div1").show();
            // $("#title").hide();
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
          localStorage.setItem("type","list_v");
            list_view();

        }));
        $(document).on('click', "#grid", (function() {
            // $("#list_cards").toggle();
            $("#list").show();
            $("#grid").hide();
            $('#list_cards').hide();
            localStorage.setItem("type","grid_view");
            get_card();

        }));
      

    });


    function list_view() {

        $.ajax({
            url: "http://localhost:8081/get_data_card",
            type: "POST",

            success: function(response) {
                var i = response.data_info.length - 1;
                console.log(i);

                $("#cards").css("height","2px");
                  $("#cards").empty();
                          $("#list_cards").empty();
                  // $("#list_cards").val("");


                localStorage.setItem('type',"list_v");
                $("#title").val("");
                $("#take_note").val("");

                for (var x = i; x >= 0; x--) {

                    data_title = response.data_info[x].title;
                    data_note = response.data_info[x].take_note;


                    var div=$("<pre id='innerbox1'>"+data_title+"<br>"+data_note+"</pre>")
                    $("#list_cards").append(div);

                }

            },
            complete: function(xhr, status) {
                console.log("the request is complete!");
            },
        });



    }

    function get_card() {
        $.ajax({
            url: "http://localhost:8081/get_data_card",
            type: "POST",

            success: function(response) {
                var i = response.data_info.length - 1;
                console.log(i);

                $("#title").val("");
                $("#take_note").val("");
                for (var x = i; x >= 0; x--) {

                    data_title = response.data_info[x].title;
                    data_note = response.data_info[x].take_note;
                    console.log(localStorage.getItem("type"));
                    if(localStorage.getItem("type")=="list_v"){


                    list_view();
                  }
                  else if(localStorage.getItem("type")=="grid_view")
                  {


                    division();

                  }
                  else{
                    division();
                  }


                }
            },
            complete: function(xhr, status) {
                console.log("the request is complete!");
            },
        });

    }

    function division() {


        var div=$("<pre id='innerbox' class='col-sm-3' >"+data_title+"<br>"+data_note+"</pre>")
        $("#cards").append(div);

        var elem = document.querySelector('#cards');
        var pckry = new Packery( elem, {
        // options
        itemSelector: '#innerbox',
        gutter: 10
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
