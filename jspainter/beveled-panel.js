autowatch = 1;

function paint()
{
	var viewsize = mgraphics.size;
	var width = viewsize[0];
	var height = viewsize[1];
  var bevel = 20;
  var border = 4;

  var fx0 = border;
  var fy0 = border;
  var fw = width - border;
  var fh = height - border;

  var hb = border/2;
  var bx0 = hb;
  var by0 = hb;
  var bw = width - hb;
  var bh = height - hb;

  with (mgraphics) {
    set_source_rgba(box.getattr("bgcolor"));

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

    /*
    move_to(bevel, 0);
    line_to(width, 0);
    line_to(width, height-bevel);
    line_to(width-bevel, height);
    line_to(0, height);
    line_to(0, bevel);
    line_to(bevel, 0);
    stroke();
    */

    //rectangle(0, 0, width-bevel, height - bevel);
    //fill();

    //rectangle(bevel, bevel, width, height);
    //fill();
  }

  //post(box.getattr("bordercolor"));
  //post()

  /*
	if (val) {
		mgraphics.set_source_rgba(box.getattr("checkedcolor"));	
	} else {
		mgraphics.set_source_rgba(box.getattr("uncheckedcolor"));
	}

	mgraphics.set_line_width((2./12.) *  box.getattr("thickness") * 0.01 * width);  // top left to bottom right, thin
	mgraphics.set_line_cap("square");

	start = (7./24.) * width;
	
	mgraphics.move_to(start, start);
	mgraphics.line_to(width - start, height - start);
	mgraphics.stroke();

	mgraphics.move_to(width - start, start);
	mgraphics.line_to(start, height - start);
	mgraphics.stroke();
  */

}
