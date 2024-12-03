import { Box, Grid2, PaperProps, Typography } from "@mui/material";
import { useState } from "react";

type PropsType = {
    homeTeam: string
    awayTeam: string
}

const Vote: React.FC<PropsType> = ({ homeTeam, awayTeam }) => {
    const [votesA, setVotesA] = useState(0);
    const [votesB, setVotesB] = useState(0);
  
    const totalVotes = votesA + votesB;
  
    const handleVoteA = () => {
      setVotesA((prev) => prev + 1);
    };
  
    const handleVoteB = () => {
      setVotesB((prev) => prev + 1);
    };
  
    const getPercentage = (votes: number) => {
      return totalVotes === 0 ? 0 : Math.round((votes / totalVotes) * 100);
    };
  
    return (
      <Grid2 style={{ width: '100%', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
        <Typography variant="h5">Голосование за результат матча</Typography>
        <Box>
          <button onClick={handleVoteA} style={{ marginRight: '10px' }}>
            {homeTeam}
          </button>
          <button onClick={handleVoteB}>{awayTeam}</button>
        </Box>
        <Box style={{ marginTop: '20px' }}>
          <Box
            style={{
              display: 'flex',
              width: '100%',
              height: '5px',
              backgroundColor: '#e0e0e0',
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            <Box
              style={{
                width: `${getPercentage(votesA)}%`,
                height: '5px',
                backgroundColor: 'background.paper',
                transition: 'width 0.3s ease',
              }}
            />
            <Box
              style={{
                width: `${getPercentage(votesB)}%`,
                height: '5px',
                backgroundColor: '#C3CC5A',
                transition: 'width 0.3s ease',
              }}
            />
          </Box>
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <strong>{homeTeam}:</strong> {votesA} votes ({getPercentage(votesA)}%) | <strong>{awayTeam}:</strong> {votesB} votes ({getPercentage(votesB)}%)
          </div>
          <Box style={{ marginTop: '10px', textAlign: 'center' }}>
            <strong>Total votes:</strong> {totalVotes}
          </Box>
        </Box>
      </Grid2>
    );
  };
  
  export default Vote;