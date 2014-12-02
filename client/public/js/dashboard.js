'use strict';

$(function(){

  var total_votes = 0;
  var admin_view  = $('#admin_view').val();

  var candidate_template = ['<div class="col-md-6" id="candidate_%tag%" style="display:none;">',
          '<div class="box-rounded">',
            '<div class="row">',
              '<div class="col-md-4">',
                '<img src="%img%" class="img-circle" />',
              '</div>',
              '<div class="col-md-7">',
                '<h2>%name%</h2>',
                '<div class="progress">',
                  '<div class="progress-bar progress-bar-striped active share_%tag%" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width: 0%">',
                  '</div>',
                '</div>',
                '<div class="partial_%tag%">',
                  '<p class="votes_%tag%"><strong>0 votes</strong> / 0%</p>',
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
   * Votes
   */

  var update_votes = function(candidate, votes){
    var share = (votes * 100) / total_votes;
    $('.votes_' + candidate)
          .html("<strong>" + votes + " votes</strong> / " + share.toFixed(2) + "%</p>");
    $('.share_' + candidate).css('width', share + '%');
  }

  /**
   * Vote button
   */
  $('#candidates-list').on('click', 'button.btn_candidate', function(){
    $.ajax('http://localhost:8080/votes', {
      data: JSON.stringify({candidate_tag: this.value}),
      contentType: 'application/json',
      type: 'POST'
    });
  });

  /**
   * Sockets interaction
   */
  var socket = io.connect();

  socket.on('candidates', function(candidate){
    $('#candidates-list').append(template(candidate));

    if(admin_view == "true")
      $('.partial_' + candidate.tag)
        .append('<button type="button" class="btn btn btn-sm btn_candidate" \
                 value="' + candidate.tag + '">+1 Vote</button>');

    $('#candidate_' + candidate.tag).fadeIn(500);
  });

  socket.on('votes', function(votes){
    total_votes = _.map(votes, function(total, candidate_tag){
                    return total;
                  }).reduce(function(acc, total) { return acc + total; },0);

    _.each(votes, function(count, candidate){
      update_votes(candidate, count);
    });
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
