autowatch = 1;

function paint()
{
	var viewsize = mgraphics.size;
	var width = viewsize[0];
	var height = viewsize[1];
  var bevel = 20;
  var border = 4;

  var hb = border/2;
  var bx0 = hb;
  var by0 = hb;
  var bw = width - hb;
  var bh = height - hb;

  var tex = new Image('metal.jpg');
  var texpat = mgraphics.pattern_create_for_surface(tex) 

  with (mgraphics) {
    //set_source_rgba(box.getattr("bgcolor"));
    set_source(texpat);

    move_to(bx0 + bevel, by0);
    line_to(bw, by0);
    line_to(bw, bh-bevel);
    line_to(bw-bevel, bh);
    line_to(bx0, bh);
    line_to(bx0, by0 + bevel);
    line_to(bx0 + bevel, by0);
    fill();


    set_source_rgba(box.getattr("bordercolor"));
    set_line_width(border);

    move_to(bx0 + bevel, by0);
    line_to(bw, by0);
    line_to(bw, bh-bevel);
    line_to(bw-bevel, bh);
    line_to(bx0, bh);
    line_to(bx0, by0 + bevel);
    line_to(bx0 + bevel, by0);
    stroke();
  }
}
