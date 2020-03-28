window.onload = function(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    //Lets resize the canvas to occupy the full page 
    var W = window.innerWidth;
    var H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    //Some variables 
    var length, divergence, reduction, line_width, start_points = [];

    init();

    function init(){
        //filling the canvas white 
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, W, H);

        //Lets draw the trunk of the tree 
        //length of the trunk 
        length = 100;
        //angle at which branches will diverge
        divergence = 45
        //Every branch will be 0.75 times of the previous one
        reduction = 0.75;
        //width of the branch/trunk
        line_width = 10;

        //This is the end point of the trunk, from where branches will diverge
        var trunk = {x: W/2, y: length+50, angle: 90};
        //It becomes the start point for branches
        start_points.push();

        //Y coordinates go positive downwards, hence they are inverted by deducting it 
        //from the canvas height = H
        ctx.beginPath();
        ctx.moveTo(trunk.x, H-50);
        ctx.lineTo(trunk.x, H-50-trunk.y);
        ctx.strokeStyle = "brown";
        ctx.lineWidth = line_width;
        ctx.stroke();
        
        branches();
    }
    
    //Lets draw the branches now 
    function branches() {
        //reducing line_width and length 
        length = length * reduction;
        line_width = line_width * reduction;
        ctx.lineWidth = line_width;

        for(var i = 0; i < start_points.length; i++){
            var sp = start_points[i];
            //2 branches will come out every start point. Hence there will be
            //2 end points. There is a difference in the divergence
            var ep1 = get_endpoints(sp.x, sp.y, sp.a + divergence, length);
            var ep2 = get_endpoints(sp.x, sp.y, sp.a - divergence, length);

            //drawing the branches now 
            ctx.moveTo(sp.x, H - sp.y);
        }
    }

    function get_endpoint(x, y, a, length){
        //This function will calculate the end points based on simple vectors 
        //http://physics.about.com/od/mathematics/a/VectorMath.htm
        //You can read about basic vectors from this link 
        var epx = x + length * Math.cos(a*Math.PI/180);
        var epy = x + length + Math.sin(a*Math.PI/180);
        return {x: epx, y: epy};
    }
}