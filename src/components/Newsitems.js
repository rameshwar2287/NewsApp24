import React from 'react'

const Newsitems =(props)=>{

     let {title,description,imgUrl,newsUrl,author,date,source}=props;
    
    return (
    <>
    
    <div className="card my-1" >
    <div><span className=" badge rounded-pill bg-danger" style={{display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    right: '0'}}>
    {source}
  </span>
    </div>
  <img src={!imgUrl?"https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg":imgUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <p><small className='text-muted'>By {author?author:"Unknown"} on {date}</small></p>
    <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
  </div>
</div>
    </>
    )
  }
  export default Newsitems;
