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
                    <div>
                        <tr className="table-header">
                            <th className="padding-right-48">Lap</th>
                            <th className="padding-right-48">Lap Times</th>
                            <th className="">Overall Time</th>
                        </tr>
                    </div>
                    <div className="table-body">
                        {table.map((element, index) => {
                            return (
                                <tr key={index} >
                                    <td className="padding-top-16">{element.lap}</td>
                                    <td className="padding-top-16 padding-left-60">{element.lapTime}</td>
                                    <td className="padding-top-16 padding-left-80">{element.overallTime}</td>
                                </tr>
                            );
                        })}
                    </div>
                </table>
            </div>
        );
    }
    else {
        return (
            <div className="empty-table text-center">No laps complated</div>
        );
    }


}

export default Table;