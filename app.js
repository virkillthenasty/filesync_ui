//color scale
const colorScale = d3.scaleOrdinal()
.domain(['blue','green','yellow','red','grey'])
.range(["#00A8F0","#05EC9C",'#F5A623','#FF004B','#AAAAAF'])



///////////////////////////////////////////////////


var svg = d3.select('#graph'),
    w = +svg.attr('width')*1.1
    h = +svg.attr('height')*1.1 ;

//var color = d3.scaleOrdinal(['blue','green', 'orange']);


const rootpos = {"x":w/2, "y":h/2} // 중심 위치
const centerpos = {"x":[w/2,w/4+w/15,w*3/4-w/15], "y":[h/4,h/2+h/6-h/15,h/2+h/6-h/15]} // 3개 센터 위치
const nodepos = {"x":h/10, "y":h/10} 

const child_posx =(d)=>{

}

// giv pos for id
const posx =(d)=> {
    if(d.id === '0'){ return rootpos['x']} 
    else if(d.id.length === 1 ){ return centerpos['x'][d.id*1-1]}
    else {
        xpos = d.pe
        
        return d.x}
}

const posy =(d)=> {
    if(d.id === '0'){ return rootpos['y']} 
    else if(d.id.length === 1 ){ return centerpos['y'][d.id*1-1]}
    else {return d.y}
}


const render = (selection,  data ) => {
    const lines =  selection.selectAll('.line').data(data)                   
    lines.enter().append('line')
                    .attr('class','line')
                    .attr('x1',rootpos.x)
                    .attr('x2',d=>centerpos.x[d.id])
                    .attr('y1',rootpos.y)
                    .attr('y2',d=>centerpos.y[d.id])
                    .attr('stroke-width',2)
                    .merge(lines)
                    .transition().duration(300)
                    .attr('stroke', (d)=>{return colorScale(d.status)} )
    
    const centers = selection.selectAll('.center').data(data)
    centers.enter().append('circle')
                .attr('class','center')
                .attr('cx',(d)=>centerpos.x[d.id])
                .attr('cy',(d)=>centerpos.y[d.id])
                .attr('r', 35)
                .attr('fill', "#1D2331")
                .attr("stroke-width","5px")
            .merge(centers) // chage
                .transition().duration(300)
                .attr('r',40)
                .attr("stroke",(d)=>{return colorScale(d.status)})
                .transition().duration(300)
                .attr('r', 35)

    const imgs =  selection.selectAll('.icon').data(data)   
    imgs.enter().append("svg:image")
                        .attr('class','icon')
                        .attr("x", d=>centerpos.x[d.id]-21)
                        .attr("y", d=>centerpos.y[d.id]-14.5)
                        .attr("width", "42")
                        .merge(imgs)
                        .attr("xlink:href", d=>{if(d.status ==="blue"){return './node0.svg'}
                        else{return './node1.svg'} })

    const labels =  selection.selectAll('.label').data(data)  
    labels.enter().append("text")
                        .attr('class','label')
                        .merge(labels)
                        .style("fill", "#ffffff")
                        .attr('x',(d)=>{console.log('text')
                            return centerpos.x[d.id]})
                        .attr('y',(d)=>centerpos.y[d.id]+60)
                            .text((d)=>d.name)
                            .attr("text-anchor", "middle")
                            .attr("width", "42")
                            .attr("height", "15")
                            

    
    centers.exit().remove()
    imgs.exit().remove()
    lines.exit().remove()
    labels.exit().remove()

}


console.log('start')

const makecenter = type => {return {type: type,id: Math.random()}};

d3.json('./node_change.json',function(data){
    console.log(data[0][0].id)
    render(svg, data[0])

    setTimeout(()=>{
        render(svg, data[1])
    }, 2000)

    setTimeout(()=>{
        render(svg, data[2])
    }, 4000)

    setTimeout(()=>{
        render(svg, data[0])
    }, 6000)
})
