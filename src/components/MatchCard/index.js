import './index.css'

const MatchCard = props => {
  const {recentMatchesDetails} = props
  const {
    result,
    competingTeam,
    competingTeamLogo,
    matchStatus,
  } = recentMatchesDetails

  const matchStatusClassName = matchStatus === 'Won' ? 'Won' : 'Loss'

  return (
    <li className="match-list-details">
      <img
        src={competingTeamLogo}
        className="match-details-img"
        alt={`competing team ${competingTeam}`}
      />
      <p className="match-details-name">{competingTeam}</p>
      <p className="match-details-para">{result}</p>
      <p className={matchStatusClassName}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
