import React from 'react'

const Count = (props) => {
    return (
        <div style={{ marginTop: 120 }}>
            {
                props.uniqueLetters.map(e =>
                    <table key={e.letter} >
                        <tr>
                            <th>Character</th>
                            <th>count</th>
                        </tr>
                        <tr>
                            <td>{e.letter.toUpperCase()}</td>
                            <td>{e.count}</td>
                        </tr>
                    </table>
                )
            }
        </div>
    )
}
export default Count;