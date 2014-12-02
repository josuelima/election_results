'use strict';

$(function(){

  var candidate_template = ['<div class="col-md-6" id="candidate_%tag%" style="display:none;">',
          '<div class="box-rounded">',
            '<div class="row">',
              '<div class="col-md-4">',
                '<img src="%img%" class="img-circle" />',
              '</div>',
              '<div class="col-md-7">',
                '<h2>%name%</h2>',
                '<div class="progress">',
                  '<div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%">',
                  '</div>',
                '</div>',
                '<div>',
                  '<strong>0 votes</strong> / 0%',
                '</div>',
              '</div>',
            '</div>',
          '</div>',
        '</div>'].join('\n');

  /**
   * Replaces the candidate properties on template
   */
  var template = function(data){
    return candidate_template.replace(/%(\w*)%/g, function(m,key) {
      return data.hasOwnProperty(key) ? data[key] : "";
    });
  };

  /**
   * Sockets interaction
   */
  var socket = io.connect();

  socket.on('candidates', function(candidate){
    $('#candidates-list').append(template(candidate));
    $('#candidate_' + candidate.tag).fadeIn(500);
  });

  var clear_form = function(){
    $('#input_candidate_name').val('');
    $('#input_candidate_url').val('');
  };

  /**
   * Form Candidate
   */
  $('#cancel_candidate').on('click', clear_form);

  $('#save_candidate').on('click', function(){
    var name = $('#input_candidate_name');
    var url  = $('#input_candidate_url');

    // Need improvements on validation
    if(name.val() == '' || url.val() == '')
      return;

    $.ajax('http://localhost:8080/candidates', {
      data: JSON.stringify({name: name.val(), img: url.val()}),
      contentType: 'application/json',
      type: 'POST'
    });

    $('#add_candidate').modal('hide');
    clear_form();
  });
});
