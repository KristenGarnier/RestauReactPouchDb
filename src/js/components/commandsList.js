import React, {Component} from 'react';
import moment from 'moment';

class Commands extends Component {
    constructor(props) {
        super(props);

        this.state = {
            commands: []
        };

        this.props.SyncHandler.on('change', info => {
            console.log('change appears');

            this.props.localDb.createIndex({
                    index: {fields: ['date']}
                })
                .then(_ => {
                    return this.props.localDb.find({
                        selector: {
                            date: moment().format('D-MM-Y')
                        }
                    });
                })
                .then(res => {
                    this.setState({
                        commands: res.docs
                    });
                })
                .catch(err => {
                    console.error(err);
                });
        });

        this.props.localDb.createIndex({
                index: {fields: ['date']}
            })
            .then(_ => {
                return this.props.localDb.find({
                    selector: {
                        date: moment().format('D-MM-Y')
                    }
                });
            })
            .then(res => {
                this.setState({
                    commands: res.docs
                });
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        let total = 0;
        const commands = this.state.commands.map((command, i) => {
            total += command.price;
            return <tr key={i}>
                <td width="55">
                    <img className="avatar" src={command.user.photo} alt="Avatar on an user" width="50"/>
                </td>
                <td style={{
                    textTransform: 'capitalize'
                }}>{command.user.name}</td>
                <td>{command.restaurant.name}</td>
                <td>{command.price}</td>
                <td>
                    <button onClick={() => this.props.history.push(`/resume/command/${command._id}`)}> Details</button>
                </td>
            </tr>
        });
        return (<div>
            <button className="button-primary" onClick={() => this.props.history.push('/resume/restaurant')}>Passer commande</button>
            <button className="button-primary u-pull-right" style={{marginRight: "4rem"}} onClick={() => this.props.history.push('/resume/call')}>Je commande pour tout le monde</button>
            <h4>Commandes d'aujourd'hui</h4>
            { total > 0 ? <h5 className="u-pull-right" style={{marginRight: '4rem'}}>Total : {total} €</h5> : '' }
            <table className="u-full-width">
                <thead>
                <tr>
                    <th>Utilisateur</th>
                    <th></th>
                    <th>Restaurant</th>
                    <th>Prix</th>
                    <th>Détails</th>
                </tr>
                </thead>
                <tbody>
                {commands}
                </tbody>
            </table>
        </div>);
    }
}

export default Commands;
