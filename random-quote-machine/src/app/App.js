import React from 'react';
import './App.css';

//config constant with apiURL
const config = {
    apiUrl: "https://api.quotable.io/random"
}
const colors = ["salmon", "lightblue", "lightgreen", "black", "blue", "silver", "gold"]

// component takes social media names as props, and runs against state to display
// needed links
class ShareLinks extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            twitter: {
                href: 'https://www.twitter.com/intent/tweet',
                id: 'tweet-quote',
                label: 'twitter'
            }
        }
    }

    render() {
        return (
            <div className="">
                {this.props.linksToShow.map((link) => ( link in this.state ?
                    <a key={link} style={{backgroundColor: this.props.state.pageColor}} href={this.state[link].href}
                       className="btn border text-white" id={this.state[link].id}>
                        {this.state[link].label}
                    </a> : "" ))}
            </div>
        )
    }

}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            quote: {
                content: "",
                author: "",
                valid: false
            },
            pageColor: colors[0]
        }

        this.getQuote = this.getQuote.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    // sends api call to get random quote
    getQuote = () => {
        fetch(config.apiUrl)
            .then((response) => {
                return response.ok ? response.json() : "";
            })
            .then((data) => {
                let valid = data !== "";

                this.setState((state) => ({
                    pageColor: colors[Math.floor(Math.random() * (colors.length))],
                    quote: {
                        content: data.hasOwnProperty("content") ? data.content : state.quote.content,
                        author: data.hasOwnProperty("author") ? data.author : state.quote.author,
                        valid: valid,
                    }
                }))
            })
    }

    //on click get new quote
    handleClick() {
        this.getQuote();
    }

    componentDidMount() { this.handleClick() }

    render() {
        return <div className="app d-flex justify-content-center align-items-center"
                    style={{backgroundColor: this.state.pageColor}}>
            <article id="quote-box" className="border rounded bg-white my-5 p-4">
                <blockquote id="text" style={{color: this.state.pageColor}}>
                    {this.state.quote.content}
                </blockquote>
                <p id="author" className="text-right" style={{color: this.state.pageColor}}>
                    -{this.state.quote.author}
                </p>
                <div className="d-flex flex-wrap justify-content-between">
                    <ShareLinks linksToShow={["twitter"]} state={this.state} className="col-7"/>
                    <button onClick={this.handleClick} id="new-quote" className="border text-white rounded"
                            style={{backgroundColor: this.state.pageColor}}>
                        new quote
                    </button>
                </div>
            </article>
        </div>
    };
}

export default App;
