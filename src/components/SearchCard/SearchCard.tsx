import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Autocomplete from "../Autocomplete/Autocomplete";
import Card from "../custom/Card/Card";
import "./SearchCard.css";
import { HardDrive } from 'iconoir-react';

export default function SearchCard(props: any) {

    const [tab, setTab] = useState(" ");


    return (
    <>
        <Card>
            <CourseSearchTab />
        </Card>
        <Card>
            <TableSearchTab />
        </Card>
    </>
    );
}

function CourseSearchTab() {
    return (
        <>
            <Card.Header>
                Course Search
            </Card.Header>
            <Card.Div />
            <Card.Section>
                <div className="formItem">
                    <div className="formLabel">
                        Course
                    </div>
                    <div className="formTextInputContainer">
                        <input className="formTextInput" type="text" />
                    </div>
                </div>
                <div className="formItem">
                    <div className="formLabel">
                        Community College
                    </div>
                    <div className="formTextInputContainer">
                        {/* <input className="formTextInput" type="text" /> */}
                        <Autocomplete />
                    </div>
                    
                </div>
                <div className="formItem">
                    <div className="formLabel">
                        Major (Optional)
                    </div>
                    <div className="formTextInputContainer">
                        <input className="formTextInput" type="text" />
                    </div>
                </div>
                
                <div className="bottomButtons">
                    <button className="button infoButton">
                        Info
                    </button>
                    <button className="button searchButton">
                        Search
                    </button>
                </div>
                
            </Card.Section>
            
        </>
    );
}

interface CourseDataArray extends Array<string> {
    // institution, courseName, courseTitle, years, units
    [index: number]: string;
}

function TableSearchTab() {

    const courses: CourseDataArray[] = [
        ["California Polytechnic University, San Luis Obispo",
        "CS 141",
        "Computer Science Fundamentals: Introduction to Assembly",
        "2022-2023",
        "4.0"],
        ["California Polytechnic University, San Luis Obispo",
        "CS 141",
        "Computer Science Fundamentals: Introduction to Assembly",
        "2022-2023",
        "4.0"],
        ["Irvine Valley College",
        "CS 141",
        "Computer Science Fundamentals: Introduction to Assembly",
        "2022-2023",
        "4.0"]
    ];

    const [courseList, setCourseList] = useState(courses);

    const inputRefs: any[][] = courses.map(function (course: CourseDataArray) {
        return course.map(function () {
            return useRef<HTMLTextAreaElement>();
        })
    });

    const courseInputs: React.ReactNode[][] = courses.map(function (course: CourseDataArray, outerIdx: number) {
        return course.map(function (data: string, innerIdx: number) {
            return <textarea value={courseList[outerIdx][innerIdx]} 
                          className="cellInput"
                          ref={inputRefs[outerIdx][innerIdx]}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
                              handleInputCellChange(outerIdx, innerIdx, e)}/>
        })
    });

    const inputSelected: boolean[][] = courses.map(function (course: CourseDataArray) {
        return course.map(function () {
            return false
        })
    });

    
    

    
    const [courseInputList, setCourseInputList] = useState(courseInputs);
    
    const [isInputSelected, setIsInputSelected] = useState(inputSelected);




    // User edits cell data
    const handleInputCellChange = (cellRowIdx: number, 
                                   cellColIdx: number, 
                                   e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newCourseList: CourseDataArray[] = JSON.parse(JSON.stringify(courseList));
        newCourseList[cellRowIdx][cellColIdx] = e.target.value;
        setCourseList(newCourseList);
    };
    // const adjustCellSize = (rowIdx: number, colIdx: number) => {
    //     inputRefs[rowIdx][colIdx].current.style.height = "auto";
    //     inputRefs[rowIdx][colIdx].current.style.height = inputRefs[rowIdx][colIdx].current?.scrollHeight + "px";
    // }
    
    //
    const handleCellTypeChange = (rowIdx: number, colIdx: number, e: any) => {
        e.preventDefault();
        console.log(inputRefs[rowIdx][colIdx].current);
        console.log("HI");


        const newInputSelected: boolean[][] = JSON.parse(JSON.stringify(isInputSelected));
        newInputSelected[rowIdx][colIdx] = true;
        setIsInputSelected(newInputSelected);

        inputRefs[rowIdx][colIdx].current?.focus();

        // if (isInputSelected[rowIdx][colIdx] === false) {
        //     const newInputSelected: boolean[][] = [...isInputSelected];
        //     newInputSelected[rowIdx][colIdx] = true;
    
        //     setIsInputSelected(newInputSelected);
        // } else {
        //     console.log("trying to foxus input");
        //     const newCourseInputList = [...courseInputList];
        //     newCourseInputList[rowIdx][colIdx] = <input value={courseList[rowIdx][colIdx]}
        //                                                 autoFocus 
        //                                                 className="cellInput"
        //                                                 onChange={(newE: React.ChangeEvent<HTMLInputElement>) => 
        //                                                     handleInputCellChange(rowIdx, colIdx, newE)}/>
        //     setCourseInputList(newCourseInputList);
        // }
        
    }

    const pasteFromClipboard = async () => {
        // navigator.clipboard.readText()
        //     .then(text => {
        //         console.log('Clipboard contents:', text);
        //     })
        //     .catch(err => {
        //         console.error('Failed to read clipboard contents: ', err);
        //     });
        console.log(location.protocol);
    }

    const printClipboard = () => {

    }


    // useLayoutEffect(() => {
    //     inputRefs.map((row, rowIdx) => {
    //         row.map((col, colIdx) => {
    //             adjustCellSize(rowIdx, colIdx);
    //         })
    //     })
    // }, []);


    return(
        <>
        <Card.Header>
            Table Search
        </Card.Header>
        <Card.Div />
        <Card.Section>
            <div className="instructionContainer">
                <div className="instruction">Paste the Transfer Course table from WebAdmin</div>
                <button className="pasteButton" onClick={pasteFromClipboard}>
                    Paste from Clipboard
                </button>
            </div>
            <table className="table" cellSpacing={0}>
                <thead>
                    <tr>
                        <td>
                            {/* <div className="tableColHeader"> */}
                                Institution
                            {/* </div>     */}
                        </td>
                        
                        <td>
                            {/* <div className="tableColHeader"> */}
                                Course Name
                            {/* </div> */}
                        </td>
                        <td>
                            {/* <div className="tableColHeader"> */}
                                Course Title
                            {/* </div> */}
                        </td>
                        <td>
                            {/* <div className="tableColHeader"> */}
                                Year
                            {/* </div> */}
                        </td>
                        <td>
                            {/* <div className="tableColHeader"> */}
                                Units
                            {/* </div> */}
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {courseList.map((course: CourseDataArray, rowIdx: number) =>
                        <tr className="tableRow">
                            <td className="tableCell">
                                <div className="tableCellContent"> {/*onClick={(e) => handleCellTypeChange(rowIdx, 0, e)}> */}
                                    {isInputSelected[rowIdx][0] ?
                                        "" // courseInputList[rowIdx][0]
                                    :
                                        course[0]}

                                        {/* <textarea value={courseList[rowIdx][0]} 
                                            className="cellInput"
                                            ref={inputRefs[rowIdx][0]}
                                            // onInput={() => adjustCellSize(rowIdx, 0)}
                                            // onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                                // handleInputCellChange(rowIdx, 0, e)}}
                                        /> */}
                                        
                                </div>
                            </td>
                            <td className="tableCell">
                                <div className="tableCellContent"> {/*onClick={(e) => handleCellTypeChange(rowIdx, 1, e)}> */}
                                    {isInputSelected[rowIdx][1] ?
                                        "" // courseInputList[rowIdx][1]
                                    :
                                        course[1]}
                                </div>
                            </td>
                            <td className="tableCell">
                                <div className="tableCellContent"> {/*onClick={(e) => handleCellTypeChange(rowIdx, 2, e)}> */}
                                    {isInputSelected[rowIdx][2] ?
                                        "" // courseInputList[rowIdx][2]
                                    :
                                        course[2]}
                                </div>
                            </td>
                            <td className="tableCell">
                                <div className="tableCellContent"> {/*onClick={(e) => handleCellTypeChange(rowIdx, 3, e)}> */}
                                    {isInputSelected[rowIdx][3] ?
                                        "" // courseInputList[rowIdx][3]
                                    :
                                        course[3]}
                                </div>
                            </td>
                            <td className="tableCell">
                                <div className="tableCellContent"> {/*onClick={(e) => handleCellTypeChange(rowIdx, 4, e)}> */}
                                    {isInputSelected[rowIdx][4] ?
                                        "" // courseInputList[rowIdx][4]
                                    :
                                        course[4]}
                                </div>
                            </td>
                        </tr>
                    )}

                    
                {courseList.length > 0 ?
                    ""
                    :
                    <tr>
                        <td colSpan={6}>
                        <div className="tableNoDataContainer">
                            <HardDrive width={70} height={70} strokeWidth={0.7} className="tableNoDataImage" />
                            <div className="tableNoDataText">No Data</div>
                        </div>
                        </td>
                    </tr>
                    
                }
                </tbody>
            </table>
        </Card.Section>
        </>
    );
}

// function EditableTable(props) {
//     const [tableData, setTableData] = useState(props.data);
  
//     const handleCellChange = (event, rowIndex, columnIndex) => {
//       const newData = tableData.map((row, index) => {
//         if (index === rowIndex) {
//           return row.map((cell, cellIndex) => {
//             if (cellIndex === columnIndex) {
//               return event.target.value;
//             }
//             return cell;
//           });
//         }
//         return row;
//       });
//       setTableData(newData);
//     };
  
//     return (
//       <table>
//         <thead>
//           <tr>
//             {props.columns.map(column => (
//               <th key={column}>{column}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {tableData.map((row, rowIndex) => (
//             <tr key={rowIndex}>
//               {row.map((cell, columnIndex) => (
//                 <td key={`${rowIndex}-${columnIndex}`}>
//                   <input
//                     type="text"
//                     value={cell}
//                     onChange={event => handleCellChange(event, rowIndex, columnIndex)}
//                   />
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     );
//   }