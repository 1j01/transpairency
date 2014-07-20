
transpairent = (black, white)->
	
	if black.naturalWidth * black.naturalHeight < white.naturalWidth * white.naturalHeight
		w = black.naturalWidth
		h = black.naturalHeight
	else
		w = white.naturalWidth
		h = white.naturalHeight
	
	if w is 0 or h is 0
		throw new Error "Invalid dimensions #{w}x#{h}"
	
	canvas = (el)-> # el can be a <canvas>, an <img>, an Image, or in Firefox, any element.
		c = document.createElement("canvas")
		c.width = w
		c.height = h
		#if el.naturalWidth isnt w or el.naturalHeight isnt h
		#	throw new Error "Canvas dimensions don't match (#{c0.width}x#{c0.height} / #{c1.width}x#{c1.height})"
	
		ctx = c.getContext("2d")
		ctx.drawImage el, 0, 0, w, h
		[ctx, c]
	
	[ctx0, c0] = canvas black
	[ctx1, c1] = canvas white # was called ctx255, but it's just so much nicer when the names are the same size... I should change it to ctxb&w
	[ctxr, cr] = canvas (white or black) # result canvas
	
	id0 = ctx0.getImageData 0, 0, c0.width, c0.height
	id1 = ctx1.getImageData 0, 0, c1.width, c1.height
	idr = ctxr.getImageData 0, 0, cr.width, cr.height
	
	for i in [0...id0.data.length] by 4
		
		rb = id0.data[i+0]
		gb = id0.data[i+1]
		bb = id0.data[i+2]
		
		rw = id1.data[i+0]
		gw = id1.data[i+1]
		bw = id1.data[i+2]
		
		if rb > rw then [rw, rb] = [rb, rw]
		if gb > gw then [gw, gb] = [gb, gw]
		if bb > bw then [bw, bb] = [bb, bw]
		
		a = 255 - (rw + gw + bw - rb - gb - bb) / 3
		#if a <= 0 then return (0, 0, 0, 0)
		#if a >= 255 then return (rb, gb, bb, 255)
		
		idr.data[i+0] = 255 * rb / a # division by 0 occurs
		idr.data[i+1] = 255 * gb / a # nothing happens
		idr.data[i+2] = 255 * bb / a # it gets Infinity and it works
		
		idr.data[i+3] = a
		
	
	ctxr.putImageData idr, 0, 0
	
	cr
