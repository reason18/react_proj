// ReactDOM.render(
//   <h1> Hello World </h1>,
//   document.getElementById('content')
// )
window.ee = new EventEmitter();
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
      text: React.PropTypes.string.isRequired,
      bigText: React.PropTypes.string.isRequired
    })
  },
  getInitialState: function() {
    return {
      visible: false
    };
  },
  readmoreClick: function (e) {
    e.preventDefault();
    this.setState({visible: true});
  },
  render: function() {
    var author = this.props.data.author,
        text = this.props.data.text,
        bigText = this.props.data.bigText,
        visible = this.state.visible;
    return (
      <div className="article">
        <p className="author__news">{author} </p>
        <p className="text__news"> {text} </p>
        <a href="#"
          className={'readmore ' + (visible? 'none': '')}
          onClick={this.readmoreClick}>
          Read more
        </a>
        <p className={"bigText__news " + (visible? '': 'none')}>{bigText} </p>
      </div>
    )
  }
});

var News = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired
  },
  // getInitialState: function() {
  //   return {
  //     counter: 0
  //   }
  // },
  // onTotalNewsClick: function() {
  //   this.setState({counter: ++this.state.counter})
  // },
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
        <strong
          className={'news__count '+(data.length>0? '': 'none')}>
          Всего новостей: {data.length}
        </strong>
      </div>
    );
  }
});

var Add = React.createClass({
  getInitialState: function() {
   return {
     agreeNotChecked: true,
     authorIsEmpty: true,
     textIsEmpty: true
   };
 },
  componentDidMount: function() {
    ReactDOM.findDOMNode(this.refs.author).focus();
  },
  onButtonClick: function(e) {
    e.preventDefault();
    var textEl = ReactDOM.findDOMNode(this.refs.text)
    var author = ReactDOM.findDOMNode(this.refs.author).value;
    var text = textEl.value;

    var item = [{
      author: author,
      text: text,
      bigText:'...'
    }];

    window.ee.emit('News.add', item);

    textEl.value = '';
    this.setState({textIsEmpty: true});
  },
  onCheckRuleClick: function(e) {
    if(this.state.agreeNotChecked) {this.setState({agreeNotChecked: false});}
    else {this.setState({agreeNotChecked: true});}
  },
  onAuthorChange: function(e) {
    if(e.target.value.trim().length >0) {
      this.setState({authorIsEmpty: false})
    } else {
      this.setState({authorIsEmpty: true})
    }
  },
  onTextChange: function(e) {
    if(e.target.value.trim().length >0) {
      this.setState({textIsEmpty: false})
    } else {
      this.setState({textIsEmpty: true})
    }
  },
  onFieldChange: function(fieldName, e) {
    if(e.target.value.trim().length>0) {
      this.setState({[''+ fieldName]:false})
    } else {
      this.setState({[''+ fieldName]:true})
    }
  },
  render: function() {
    var authorIsEmpty = this.state.authorIsEmpty,
        textIsEmpty = this.state.textIsEmpty,
        agreeNotChecked = this.state.agreeNotChecked;
    return (
      <form className='add cf'>
        <input
          type='text'
          className='add__author'
          onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
          defaultValue=''
          placeholder='Your name'
          ref='author'
        />
        <textarea
          className='add__text'
          onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
          defaultValue=''
          placeholder='News text'
          ref='text'
          ></textarea>
          <label className='add__checkrule'>
            <input
              type='checkbox'
              onChange={this.onCheckRuleClick}
              ref='checkrule' />
              I agree with a rules
          </label>
          <button
            className='add__btn'
            onClick={this.onButtonClick}
            ref='alert_button'
            disabled={(agreeNotChecked || authorIsEmpty || textIsEmpty)}>
            Add news
          </button>
        </form>
    )
  }
})
// var TestButton = React.createClass({
//   getInitialState: function() {
//     return {
//       buttonVal: ''
//     }
//   },
//   onButtonClick: function(e) {
//     this.setState({buttonVal: this.state.myVal})
//   },
//   render: function() {
//     return (
//       <button
//         value={this.state.buttonVal}
//         onClick={this.onButtonClick}>
//         'Button'
//       </button>
//     )
//   }
// })

var App = React.createClass({
  getInitialState: function() {
    return {
      news: myNews
    };
  },
  componentDidMount: function() {
    var self = this;
    window.ee.addListener('News.add', function(item) {
      var nextNews = item.concat(self.state.news);
      self.setState({news: nextNews});
    });
  },
  componentWillUnmount: function() {
    window.ee.removeListener('News.add');
  },
  render: function(){
    console.log('render')
    return (
      <div className="app">
        <h3> Новости </h3>
        <Add />
        <News data={this.state.news}/>
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('content')
)
