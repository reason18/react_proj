// ReactDOM.render(
//   <h1> Hello World </h1>,
//   document.getElementById('content')
// )

var myNews = [
  {
    author: 'Саша Печкин',
    text: 'В четверг, четвертого числа...',
    bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
  },
  {
    author: 'Просто Вася',
    text: 'Считаю, что $ должен стоить 35 рублей!',
    bigText: 'А евро 42!'
  },
  {
    author: 'Гость',
    text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
    bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
  }
]

var Article = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
      author: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired
    })
  },
  render: function() {
    var author = this.props.data.author,
        text = this.props.data.text;
    return (
      <div className="article">
        <p className="author__news">{author} </p>
        <p className="text__news"> {text} </p>
      </div>
    )
  }
});

var News = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired
  },
  render: function() {
    var data = this.props.data;
    var newsTemplate;
      if(data.length>0) {
        newsTemplate = data.map(function(item, index) {
          return (
            <div key={index}>
              <Article data={item} />
            </div>
          );
    });
  } else {
      newsTemplate = <p> Пока новостей нет </p>
    }
    return (
      <div className="news">
        {newsTemplate}
        <strong className={'news__count '+(data.length>0? '': 'none')}> Всего новостей: {data.length} </strong>
      </div>
    );
  }
});

// var Comments = React.createClass({
//   render: function () {
//     return (
//       <div className="comments">
//         Новостей нет - комментировать нечего!
//       </div>
//     );
//   }
// })

var App = React.createClass({
  render: function(){
    return (
      <div className="app">
        <h3> Новости </h3>
        <News data={myNews}/>
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('content')
)
