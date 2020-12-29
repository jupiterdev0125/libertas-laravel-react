import React from 'react';

const DEFAULT_EMOJI_DATA = require('./default_emojis.json');

export class EmojiPicker extends React.Component {
    constructor(props) {
        super(props);
        this.customEmojis = props.customEmojis;
        this.guildName = props.guildName;

        this.state = {
            visible: false,
            pickedItem: props.emoji || null,
        };

        this.handleChangeDropdownVisible = this.handleChangeDropdownVisible.bind(this);
        this.onEmojiPicked = this.onEmojiPicked.bind(this);
        this.onRemoveEmoji = this.onRemoveEmoji.bind(this);
    }

    handleChangeDropdownVisible(isVisible) {
        this.setState({
            ...this.state,
            visible: isVisible,
        });
    }

    onEmojiPicked(item) {
        if (this.props.setEmoji) {
            this.props.setEmoji(item);
        }
        this.setState({
            ...this.state,
            visible: false,
            pickedItem: item,
        });
    }

    onRemoveEmoji() {
        if (this.props.setEmoji) {
            this.props.setEmoji(null);
        }
        this.setState({
            ...this.state,
            pickedItem: null,
        });
    }

    render() {
        const item = this.state.pickedItem;
        return (
            <>
                <div className="row" style={{ height: '50px', marginLeft: 'unset' }}>
                    <button
                        onClick={() => this.handleChangeDropdownVisible(!this.state.visible)}
                        className="btn btn-secondary"
                    >
                        Pick Emoji
                    </button>
                    {(() => {
                        if (item !== null) {
                            return (
                                <div
                                    style={{
                                        height: '50px',
                                        width: '50px',
                                    }}
                                >
                                    <img
                                        src="https://icon-library.net//images/close-icon-png/close-icon-png-29.jpg"
                                        style={{
                                            height: '20px',
                                            width: '20px',
                                            float: 'right',
                                        }}
                                        onClick={this.onRemoveEmoji}
                                    />
                                    <div className="emoji-item" style={{ margin: '8px' }}>
                                        {(() => {
                                            if (item.custom) {
                                                return (
                                                    <div
                                                        style={{
                                                            backgroundImage: `url(${item.image_url})`,
                                                            backgroundSize: '32px 32px',
                                                            height: '32px',
                                                            width: '32px',
                                                        }}
                                                    />
                                                );
                                            }
                                            return (
                                                <div
                                                    style={{
                                                        backgroundImage: `url("https://discordapp.com/assets/${item['background-image']}")`,
                                                        backgroundPosition: item['background-position'],
                                                        backgroundSize: item['background-size'],
                                                        height: '32px',
                                                        width: '32px',
                                                    }}
                                                />
                                            );
                                        })()}
                                    </div>
                                </div>
                            );
                        }
                        return <></>;
                    })()}
                </div>
                <EmojiDropdown
                    customEmojis={this.customEmojis}
                    guildName={this.guildName}
                    visible={this.state.visible}
                    onSelectedItem={this.onEmojiPicked}
                />
            </>
        );
    }
}

class EmojiDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.customEmojis = props.customEmojis;
        this.guildName = props.guildName;

        this.state = {
            searchString: '',
        };
        this.onInputChanged = this.onInputChanged.bind(this);
        this.onItemClicked = this.onItemClicked.bind(this);
    }

    buttonClicked(category) {
        if (this.state.searchString === '') {
            const target = document.getElementById(category);
            target.parentNode.scrollTop = target.offsetTop - 50;
        }
    }

    onInputChanged(value) {
        this.setState({
            searchString: value,
        });
    }

    onItemClicked(item) {
        this.setState({
            searchString: '',
        });
        this.props.onSelectedItem(item);
    }

    render() {
        if (this.props.visible) {
            return this.renderEmojiDropdown();
        }
        return <></>;
    }

    renderEmojiDropdown() {
        return (
            <div className="emoji-dropdown">
                <div
                    className="menubar"
                    style={{
                        paddingBottom: '0px',
                        width: '100%',
                        height: '14%',
                    }}
                >
                    <EmojiDropdownSearch onInputChanged={this.onInputChanged} />
                </div>
                <div
                    className="menubar"
                    style={{
                        width: '44px',
                        height: '86%',
                        verticalAlign: 'top',
                    }}
                >
                    {Object.keys(DEFAULT_EMOJI_DATA).map((category) => (
                        <div onClick={() => this.buttonClicked(category)} style={{ marginTop: '5px' }} key={category}>
                            <img
                                src={`/images/emojipicker-logos/${category}.png`}
                                style={{
                                    width: '24px',
                                    height: '24px',
                                }}
                            />
                        </div>
                    ))}
                </div>
                <EmojiPickerView
                    customEmojis={this.customEmojis}
                    guildName={this.guildName}
                    searchString={this.state.searchString}
                    onItemClicked={this.onItemClicked}
                />
            </div>
        );
    }
}

export class EmojiDropdownSearch extends React.Component {
    constructor(props) {
        super(props);
        this.onInputChanged = this.onInputChanged.bind(this);
    }

    onInputChanged(event) {
        this.props.onInputChanged(event.target.value);
    }

    render() {
        return (
            <input onChange={this.onInputChanged} className="form-control m-bot-1" placeholder="Find your emoji" />
        );
    }
}

export class EmojiPickerView extends React.Component {
    constructor(props) {
        super(props);

        this.customEmojis = props.customEmojis.map((item) => {
            item.custom = true;
            item.label = item.name;
            return item;
        });

        this.guildName = props.guildName;
        this.onItemClicked = this.onItemClicked.bind(this);
    }

    onItemClicked(item) {
        this.props.onItemClicked(item);
    }

    render() {
        if (this.props.searchString === '') {
            return this.renderEmojiPickerNoSearch();
        }
        return this.renderEmojiPickerWithSearch();
    }

    renderEmojiPickerNoSearch() {
        return (
            <div className="emoji-picker">
                <div id={this.guildName} style={{ display: 'inline-block' }}>
                    <p style={{ paddingTop: '5px' }}>{this.guildName.toLocaleUpperCase()}</p>
                    {this.customEmojis.map((item, index) => (
                        <div className="emoji-item" onClick={() => this.onItemClicked(item)} key={index}>
                            <div
                                style={{
                                    backgroundImage: `url(${item.image_url})`,
                                    backgroundSize: '32px 32px',
                                    height: '32px',
                                    width: '32px',
                                }}
                            />
                        </div>
                    ))}

                    {(() => {
                        if (this.customEmojis.length === 0) {
                            return <p style={{ paddingTop: '0px' }}>There are no emojis set for this server.</p>;
                        }
                        return <></>;
                    })()}
                </div>
                {Object.keys(DEFAULT_EMOJI_DATA).map((category) => (
                    <div id={category} style={{ display: 'inline-block' }} key={`${category}-box`}>
                        <p>{category.toLocaleUpperCase()}</p>
                        {DEFAULT_EMOJI_DATA[category].map((item, index) => (
                            <div className="emoji-item" onClick={() => this.onItemClicked(item)} key={index}>
                                <div
                                    style={{
                                        backgroundImage: `url("https://discordapp.com/assets/${item['background-image']}")`,
                                        backgroundPosition: item['background-position'],
                                        backgroundSize: item['background-size'],
                                        height: '32px',
                                        width: '32px',
                                    }}
                                />
                            </div>
                        ))}
                        <br />
                    </div>
                ))}
            </div>
        );
    }

    renderEmojiPickerWithSearch() {
        const defaults = Object.keys(DEFAULT_EMOJI_DATA)
            .map((key) => DEFAULT_EMOJI_DATA[key])
            .flat();

        const all = this.customEmojis;
        Array.prototype.push.apply(all, defaults);
        const both = all.filter((item) => item.label.toLowerCase().includes(this.props.searchString.toLowerCase()));

        return (
            <div className="emoji-picker">
                <div style={{ display: 'inline-block' }}>
                    {both.map((item, index) => (
                        <div className="emoji-item" onClick={() => this.onItemClicked(item)} key={index}>
                            {(() => {
                                if (item.custom) {
                                    return (
                                        <div
                                            style={{
                                                backgroundImage: `url(${item.image_url})`,
                                                backgroundSize: '32px 32px',
                                                height: '32px',
                                                width: '32px',
                                            }}
                                        />
                                    );
                                }
                                return (
                                    <div
                                        style={{
                                            backgroundImage: `url("https://discordapp.com/assets/${item['background-image']}")`,
                                            backgroundPosition: item['background-position'],
                                            backgroundSize: item['background-size'],
                                            height: '32px',
                                            width: '32px',
                                        }}
                                    />
                                );
                            })()}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
