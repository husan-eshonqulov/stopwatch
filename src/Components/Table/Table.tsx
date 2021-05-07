import '../Table/Table.css';

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
                <table className="">
                    <thead>
                        <tr className="">
                            <th className="">Lap</th>
                            <th className="">Lap Times</th>
                            <th className="">Overall Time</th>
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
            <div>No laps complated</div>
        );
    }


}

export default Table;