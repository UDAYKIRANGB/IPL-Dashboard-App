import {Component} from 'react'
import {Link} from 'react-router-dom'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

class TeamMatches extends Component {
  state = {
    teamBannerUrl: '',
    latestMatchDetails: {},
    recentMatches: [],
    isActive: true,
  }

  componentDidMount() {
    this.getTeamMatchesData()
  }

  getTeamMatchesData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    this.setState({
      teamBannerUrl: data.team_banner_url,

      latestMatchDetails: {
        umpires: data.latest_match_details.umpires,
        result: data.latest_match_details.result,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        id: data.latest_match_details.id,
        date: data.latest_match_details.date,
        venue: data.latest_match_details.venue,
        competingTeam: data.latest_match_details.competing_team,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
        firstInnings: data.latest_match_details.first_innings,
        secondInnings: data.latest_match_details.second_innings,
        matchStatus: data.latest_match_details.match_status,
      },

      recentMatches: data.recent_matches.map(each => ({
        umpires: each.umpires,
        result: each.result,
        manOfTheMatch: each.man_of_the_match,
        id: each.id,
        date: each.date,
        venue: each.venue,
        competingTeam: each.competing_team,
        competingTeamLogo: each.competing_team_logo,
        firstInnings: each.first_innings,
        secondInnings: each.second_innings,
        matchStatus: each.match_status,
      })),

      isActive: false,
    })
  }

  render() {
    const {
      isActive,
      teamBannerUrl,
      recentMatches,
      latestMatchDetails,
    } = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params

    const won = recentMatches.filter(m => m.matchStatus === 'Won').length
    const lost = recentMatches.filter(m => m.matchStatus === 'Lost').length
    const draw = recentMatches.filter(m => m.matchStatus === 'Draw').length

    console.log(won)
    console.log(recentMatches.map(m => m.matchStatus))

    const pieData = [
      {name: 'Won', value: won},
      {name: 'Lost', value: lost},
      {name: 'Draw', value: draw},
    ]

    const COLORS = ['#0088FE', '#FF8042', '##FFBB28']

    return (
      <div>
        {isActive ? (
          <div>
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className={`team-container ${id}`}>
            <img
              src={teamBannerUrl}
              alt="team banner"
              className="team-banner"
            />
            <h1 className="Latest-match-heading">Latest Matches</h1>
            <LatestMatch latestMatchDetails={latestMatchDetails} />
            <ul className="matches-list">
              {recentMatches.map(each => (
                <MatchCard recentMatchesDetails={each} key={each.id} />
              ))}
            </ul>
            <h1 className="stats-heading">Match Statistics</h1>
            <div className="stats-container">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <Link to="/" className="link">
              <button type="button" className="back-button">
                Back
              </button>
            </Link>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
