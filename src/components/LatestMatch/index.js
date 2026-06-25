import './index.css'

const LatestMatch = props => {
  const {latestMatchDetails} = props
  const {
    umpires,
    result,
    manOfTheMatch,
    date,
    venue,
    competingTeam,
    competingTeamLogo,
    firstInnings,
    secondInnings,
  } = latestMatchDetails
  return (
    <div className="first-match-details-container">
      <div className="match-image-details-container">
        <div className="match-details-container">
          <p className="first-match-heading">{competingTeam}</p>
          <p className="first-match-heading">{date}</p>
          <p className="first-match-discrition">{venue}</p>
          <p>{result}</p>
        </div>
        <img
          src={competingTeamLogo}
          className="opp-team-logo-image"
          alt={`latest match ${competingTeam}`}
        />
      </div>
      <hr className="line" />
      <div className="player-details-container">
        <p className="player-names">First Innings</p>
        <p className="player-names">{firstInnings}</p>
        <p className="player-names">Second Innings</p>
        <p className="player-names">{secondInnings}</p>
        <p className="player-names">Man Of the Match</p>
        <p className="player-names">{manOfTheMatch}</p>
        <p className="player-names">Umpires</p>
        <p>{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
