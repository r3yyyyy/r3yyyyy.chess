var d = $(document);
$(function(){
  d.data('timer', '0');
  d.data('p1', '12');
  d.data('p2', '12');
});

function setMessage(text)
{
  e = $('div.message div');
  e.fadeOut(300).stop(true, true).data('text', e.text()).fadeIn(300);
  e.text(text);
  setTimeout('defaultMessage()', 5000);
}

function defaultMessage()
{
  e = $('div.message div');
  e.fadeOut(300).stop(true, true).text(e.data('text')).fadeIn(300);
  e.data('text', '');
}

function timer()
{
  var t = d.data('timer');
  var result = Math.floor(t / 60);
  if(result < 10)
    result = '0' + result;
  result += ':';

  var seconds = t % 60;
  if(seconds < 10)
    seconds = '0' + seconds;

  result += seconds;

  $('div.timer').text(result);

  d.data('timer', ((t * 1) + 1));

  setTimeout('timer()', 1000);
}

function player()
{
  return d.data('player');
}

function mPawn()
{
  if(player() == 1)
    d.data('p2', ((d.data('p2') * 1) - 1));
  else if(player() == 2)
    d.data('p1', ((d.data('p1') * 1) - 1));

  $('div.score').text('Белые ' + d.data('p1') + ':' + d.data('p2') + ' Красные');
}

function arrOfPossible(r, c, k)
{
  r = r * 1;
  c = c * 1;

  var result = new Array();

  var pawn = 'pawn';
  if(player() == 1)
    pawn += '2';
  else if(player() == 2)
    pawn += '1';

  var myPawn = 'pawn' + player();

  var ei, s, e;

  e = $('tr[p=' + r + '] td[p=' + c + '] div');
  if(e.hasClass('queen' + player()))
    return arrOfPossibleQueen(r, c, k);

  e = $('tr[p=' + (r - 1) + ']').children('td[p=' + (c - 1) + ']');
  if(e.children('div').hasClass(pawn))
  {
    if((r - 2) > 0 && (c - 2) > 0)
    {
        ei = $('tr[p=' + (r - 2) + '] > td[p=' + (c - 2) + '] > div');
        if(!ei.hasClass(pawn) && !ei.hasClass(myPawn))
        {
            s = (r - 2) + ';' + (c - 2);
            result.push(s);
        }
    }
  }

  e = $('tr[p=' + (r - 1) + ']').children('td[p=' + (c + 1) + ']');
  if(e.children('div').hasClass(pawn))
  {
    if((r - 2) > 0 && (c + 2) <= 8)
    {
        ei = $('tr[p=' + (r - 2) + '] > td[p=' + (c + 2) + '] > div');
        if(!ei.hasClass(pawn) && !ei.hasClass(myPawn))
        {
            s = (r - 2) + ';' + (c + 2);
            result.push(s);
        }
    }
  }

  e = $('tr[p=' + (r + 1) + ']').children('td[p=' + (c - 1) + ']');
  if(e.children('div').hasClass(pawn))
  {
    if((r + 2) <= 8 && (c - 2) > 0)
    {
        ei = $('tr[p=' + (r + 2) + '] > td[p=' + (c - 2) + '] > div');
        if(!ei.hasClass(pawn) && !ei.hasClass(myPawn))
        {
            s = (r + 2) + ';' + (c - 2);
            result.push(s);
        }
    }
  }

  e = $('tr[p=' + (r + 1) + ']').children('td[p=' + (c + 1) + ']');
  if(e.children('div').hasClass(pawn))
  {
    if((r + 2) <= 8 && (c + 2) <= 8)
    {
        ei = $('tr[p=' + (r + 2) + '] > td[p=' + (c + 2) + '] > div');
        if(!ei.hasClass(pawn) && !ei.hasClass(myPawn))
        {
            s = (r + 2) + ';' + (c + 2);
            result.push(s);
        }
    }
  }

  if(!k)
  {
    if(c > 1 && r > 1)
    {
        e = $('tr[p=' + (r - 1) + ']').children('td[p=' + (c - 1) + ']');
        if(!e.children('div').hasClass(myPawn))
        {
            if(!e.children('div').length)
            {
                if(player() == 1 || $('tr[p=' + r + '] td[p=' + c + '] div').hasClass('queen' + player()))
                {
                    s = (r - 1) + ';' + (c - 1);
                    result.push(s);
                }
            }
        }
    }

    if(c <= 8 && r > 1)
    {
        e = $('tr[p=' + (r - 1) + ']').children('td[p=' + (c + 1) + ']');
        if(!e.children('div').hasClass(myPawn))
        {
            if(!e.children('div').length)
            {
                if(player() == 1 || $('tr[p=' + r + '] td[p=' + c + '] div').hasClass('queen' + player()))
                {
                    s = (r - 1) + ';' + (c + 1);
                    result.push(s);
                }
            }
        }
    }

    if(c > 1 && r < 8)
    {
        e = $('tr[p=' + (r + 1) + ']').children('td[p=' + (c - 1) + ']');
        if(!e.children('div').hasClass(myPawn))
        {
            if(!e.children('div').length)
            {
                if(player() == 2 || $('tr[p=' + r + '] td[p=' + c + '] div').hasClass('queen' + player()))
                {
                    s = (r + 1) + ';' + (c - 1);
                    result.push(s);
                }
            }
        }
    }

    if(c < 8 && r < 8)
    {
        e = $('tr[p=' + (r + 1) + ']').children('td[p=' + (c + 1) + ']');
        if(!e.children('div').hasClass(myPawn))
        {
            if(!e.children('div').length)
            {
                if(player() == 2 || $('tr[p=' + r + '] td[p=' + c + '] div').hasClass('queen' + player()))
                {
                    s = (r + 1) + ';' + (c + 1);
                    result.push(s);
                }
            }
        }
    }
  }
  return result;
}

function arrOfPossibleQueen(r, c, k)
{
  r = r * 1;
  c = c * 1;
  var result = new Array();

  var pawn = 'pawn';
  if(player() == 1)
    pawn += '2';
  else if(player() == 2)
    pawn += '1';

  var myPawn = 'pawn' + player();

  var r2, c2, e, s;

  var b = true; r2 = r; c2 = c;
  while(b)
  {
    r2 = r2 - 1;
    c2 = c2 - 1;
    if(r2 < 2 || c2 < 2)
    {
        b = false;
        break;
    }

    e = $('tr[p=' + r2 + '] td[p=' + c2 + ']');
    if(e.children('div').hasClass(pawn))
    {
        if(!$('tr[p=' + (r2 - 1) + '] td[p=' + (c2 - 1) + ']').children('div').length)
        {
            s = (r2 - 1) + ';' + (c2 - 1);
            result.push(s);
        }
        break;
    }
    if(e.children('div').hasClass(myPawn))
        break;
  }

  b = true; r2 = r; c2 = c;
  while(b)
  {
    r2 = r2 - 1;
    c2 = c2 + 1;
    if(r2 < 2 || c2 > 7)
    {
        b = false;
        break;
    }

    e = $('tr[p=' + r2 + '] td[p=' + c2 + ']');
    if(e.children('div').hasClass(pawn))
    {
        if(!$('tr[p=' + (r2 - 1) + '] td[p=' + (c2 + 1) + ']').children('div').length)
        {
            s = (r2 - 1) + ';' + (c2 + 1);
            result.push(s);
        }
        break;
    }
    if(e.children('div').hasClass(myPawn))
        break;
  }

  b = true; r2 = r; c2 = c;
  while(b)
  {
    r2 = r2 + 1;
    c2 = c2 - 1;
    if(r2 > 7 || c2 < 2)
    {
        b = false;
        break;
    }

    e = $('tr[p=' + r2 + '] td[p=' + c2 + ']');
    if(e.children('div').hasClass(pawn))
    {
        if(!$('tr[p=' + (r2 + 1) + '] td[p=' + (c2 - 1) + ']').children('div').length)
        {
            s = (r2 + 1) + ';' + (c2 - 1);
            result.push(s);
        }
        break;
    }
    if(e.children('div').hasClass(myPawn))
        break;
  }

  b = true; r2 = r; c2 = c;
  while(b)
  {
    r2 = r2 + 1;
    c2 = c2 + 1;
    if(r2 > 7 || c2 > 7)
    {
        b = false;
        break;
    }

    e = $('tr[p=' + r2 + '] td[p=' + c2 + ']');
    if(e.children('div').hasClass(pawn))
    {
        if(!$('tr[p=' + (r2 + 1) + '] td[p=' + (c2 + 1) + ']').children('div').length)
        {
            s = (r2 + 1) + ';' + (c2 + 1);
            result.push(s);
        }
        break;
    }
    if(e.children('div').hasClass(myPawn))
        break;
  }

  if(!k)
  {
    b = true; r2 = r - 1; c2 = c - 1;
    while(b)
    {
        e = $('tr[p=' + r2 + '] td[p=' + c2 + ']');
        if(e.children('div').hasClass(pawn) || e.children('div').hasClass(myPawn))
            break;

        s = r2 + ';' + c2;
        result.push(s);

        r2 = r2 - 1;
        c2 = c2 - 1;
        if(r2 < 1 || c2 < 1)
            b = false;
    }

    b = true; r2 = r - 1; c2 = c + 1;
    while(b)
    {
        e = $('tr[p=' + r2 + '] td[p=' + c2 + ']');
        if(e.children('div').hasClass(pawn) || e.children('div').hasClass(myPawn))
            break;

        s = r2 + ';' + c2;
        result.push(s);

        r2 = r2 - 1;
        c2 = c2 + 1;
        if(r2 < 1 || c2 > 8)
            b = false;
    }

    b = true; r2 = r + 1; c2 = c - 1;
    while(b)
    {
        e = $('tr[p=' + r2 + '] td[p=' + c2 + ']');
        if(e.children('div').hasClass(pawn) || e.children('div').hasClass(myPawn))
            break;

        s = r2 + ';' + c2;
        result.push(s);

        r2 = r2 + 1;
        c2 = c2 - 1;
        if(r2 > 8 || c2 < 1)
            b = false;
    }

    b = true; r2 = r + 1; c2 = c + 1;
    while(b)
    {
        e = $('tr[p=' + r2 + '] td[p=' + c2 + ']');
        if(e.children('div').hasClass(pawn) || e.children('div').hasClass(myPawn))
            break;

        s = r2 + ';' + c2;
        result.push(s);

        r2 = r2 + 1;
        c2 = c2 + 1;
        if(r2 > 8 || c2 > 8)
            b = false;
    }
  }

  return result;
}

function checkOnKick()
{
  var result = new Array();
  var r, c;

  $('div.pawn' + player()).parent().each(function(){
    c = $(this).attr('p');
    r = $(this).parent().attr('p');
    p = arrOfPossible(r, c, true);
    if(p.length)
        result.push(r + ';' + c);
  });

  return result;
}

function getPossible(r, c, k)
{
  var p = arrOfPossible(r, c, k);

  var arr;

  for(var i = 0; i < p.length; i++)
  {
    arr = p[i].split(';');
    $('tr[p=' + arr[0] + ']').children('td[p=' + arr[1] + ']').toggleClass('possible').toggleClass('p2');
  }
}

function changePlayer()
{
  if(player() == 2)
  {
    d.data('player', '1');
    $('div.indicator').text('Белые').animate({top: '372px'}, 500);
  }
  else if(player() == 1)
  {
    d.data('player', '2');
    $('div.indicator').text('Красные').animate({top: '80px'}, 500);
  }
}

function start()
{
  d.data('player', '1');
  $('div.indicator > div').text('Белые').parent().animate({top: '372px'}, 500);
  $('div.timer').show();
  $('div.score').show();
  timer();
}

function end()
{
  var r;
  r = 'Конец!<br/>';
  if(d.data('p1') == 0)
    r += 'Красные';
  else if(d.data('p2') == 0)
    r += 'Белые';
  r += ' выиграли';

  $('div.win > div').html(r).parent().fadeIn(500);
  $('div.timer').hide();
  $('div.indicator').hide();
}

$('input.start').click(function(){
  start();
  $(this).parent().fadeOut(500);
});

$('td > div.pawn1').live('hover', function(){
  if(player() == 1)
    $(this).parent().toggleClass('hover');
});
$('td > div.pawn2').live('hover', function(){
  if(player() == 2)
    $(this).parent().toggleClass('hover');
});

$('td').click(function(){
  if($(this).hasClass('possible'))
    return true;
  $('td').removeClass('checked').removeClass('possible').removeClass('p2');
});

$('div.pawn1').live('click', function(){
    if(player() == 2)
        return true;

    $(this).parent().toggleClass('checked');

    var r = $(this).parent().parent().attr('p');
    var c = $(this).parent().attr('p');
    var k = checkOnKick();
    var ch = r + ';' + c;
    if(k.length)
        getPossible(r, c, true);
    else
        getPossible(r, c, false);
});
$('div.pawn2').live('click', function(){
    if(player() == 1)
        return true;

    $(this).parent().toggleClass('checked');

    var r = $(this).parent().parent().attr('p');
    var c = $(this).parent().attr('p');
    var k = checkOnKick();
    var ch = r + ';' + c;
    if(k.length)
        getPossible(r, c, true);
    else
        getPossible(r, c, false);
});

$('td.possible').live('click', function(){
  var e = $('td.checked');

  var re = (e.parent().attr('p')) * 1;
  var ce = (e.attr('p')) * 1;
  var r = ($(this).parent().attr('p')) * 1;
  var c = ($(this).attr('p')) * 1;
  var kick = false;
  var ei, rn, cn;

  if(Math.abs(r - re) > 1 && Math.abs(c - ce) > 1)
  {
    rn = (r + ((re - r)/(Math.abs(re - r))));
    cn = (c + ((ce - c)/(Math.abs(ce - c))));
    ei = $('tr[p=' + rn + '] > td[p=' + cn + ']');
    if(ei.children('div').length)
    {
        ei.html('');
        mPawn();
        kick = true;
    }
  }

  if(kick)
  {
    var p1 = d.data('p1');
    var p2 = d.data('p2');
    if(p1 * p2 == 0)
        end();
  }

  $(this).html(e.html());
  e.html('');

  if(player() == 1)
  {
    if(r == 1)
        $(this).children('div.pawn1').addClass('queen1');
  }
  else if(player() == 2)
  {
    if(r == 8)
        $(this).children('div.pawn2').addClass('queen2');
  }

  $('td').removeClass('checked').removeClass('possible').removeClass('p2');

  var p = arrOfPossible(r, c, true);
  if(p.length && kick)
  {
    $(this).toggleClass('checked');
    getPossible(r, c, true);
  }
  else
    changePlayer();
});