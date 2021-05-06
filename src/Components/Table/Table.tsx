interface ITableProps {
    table: {
        lap: number | string,
        lapTime: string,
        overallTime: string,
    }[] | undefined,
}

function Table(props: ITableProps) {
    const table = props.table;
    if (table !== undefined) {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Lap</th>
                            <th>Lap Times</th>
                            <th>Overall Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <td>{element.lap}</td>
                                    <td>{element.lapTime}</td>
                                    <td>{element.overallTime}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }


}

export default Table;