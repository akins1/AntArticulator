import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import "./Autocomplete.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Cancel, NavArrowDown, NavArrowUp } from 'iconoir-react';
import { institutionList } from "../../data/InstitutionList";

interface HighlightedOption {
    option: string,
    optionHighlighted: React.ReactNode
}


export default function Autocomplete(props: any) {

    const OPTIONS: string[] = institutionList;
    const HIGHLIGHTED_OPTIONS: HighlightedOption[] = OPTIONS.map((institutionName) => {return {option: institutionName, optionHighlighted: institutionName}})

    const [userInput, setUserInput] = useState("");
    const [isOptionsVisible, setOptionsVisible] = useState(false);
    
    const [filteredOptions, setFilteredOptions] = useState(HIGHLIGHTED_OPTIONS);
    const inputFocusRef = useRef<HTMLInputElement>(null);
    const optionsPaneRef = useRef<HTMLDivElement>(null);

    
    // When the user types
    const handleUserInputChange = (e: any) => {
        e.preventDefault();

        // Update state w/ user's input
        setUserInput(e.target.value);

        // Scroll to top on Option Pane
        if (optionsPaneRef && optionsPaneRef.current) {
            optionsPaneRef.current.scroll({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Filter Options
        if (e.target.value === "") {
            setFilteredOptions(HIGHLIGHTED_OPTIONS);
        } else {
            const orderedResults = orderOptions(e.target.value);
            setFilteredOptions(orderedResults);
        }
    }

    // Filter and Sort Options
    const orderOptions = (userInput: string) => {

        let orderedResultsHighlighted: HighlightedOption[] = [];

        // Filter and Sort
        orderedResultsHighlighted = HIGHLIGHTED_OPTIONS.filter((option: HighlightedOption) => {
            const index = option.option.toLowerCase().search(userInput.toLowerCase());
            return index >= 0;
            //orderedResultsHighlighted.push(highlightedOption);
            
        }).sort((a, b) => (a.option > b.option) ? 1 : -1);

        // Highlight Text
        orderedResultsHighlighted.forEach((option: HighlightedOption) => {
            const index = option.option.toLowerCase().search(userInput.toLowerCase());
            const highlightedText: React.ReactNode = <>{option.option.slice(0, index)}<div className="highlightedText">{option.option.slice(index, index + userInput.length)}</div>{option.option.slice(index + userInput.length)}</>;
            option.optionHighlighted = highlightedText;
        })

        return orderedResultsHighlighted;
    }

    // highlights the selected option and unhighlights all others
    const highlightSelectedOption = (option: HighlightedOption) => {
        const newFilteredOptions = filteredOptions;
        const newOption = option;
        newOption.optionHighlighted = <div className="highlightedText">{option.option}</div>
        for (let i = 0; i < newFilteredOptions.length; i++) {
            if (newFilteredOptions[i].option == option.option) {
                newFilteredOptions[i] = newOption;
            } else {
                newFilteredOptions[i].optionHighlighted = newFilteredOptions[i].option;
            }
        }
        setFilteredOptions(newFilteredOptions);
    }

    const toggleInputFocus = (setFocus: boolean) => {
        if (inputFocusRef && inputFocusRef.current) {
            if (setFocus) {
                inputFocusRef.current.focus();
            } else {
                inputFocusRef.current.blur();
            }
        }
    }


    return (
    <>
    <div className="inputContainer">
        <input value={userInput} 
               onChange={handleUserInputChange} 
               onFocus={() => setOptionsVisible(true)}
               onBlur={() => setOptionsVisible(false)}
               onClick={() => setOptionsVisible(true)}
               className="inputBox" 
               type="text" 
               ref={inputFocusRef}/>
        <div className="inputButtons">
            {userInput.length > 0 ? 
            <div className="inputButtonCancel"
                 onMouseDown={(e) => {
                    e.preventDefault();
                    toggleInputFocus(true);
                    setUserInput("");
                    setFilteredOptions(HIGHLIGHTED_OPTIONS);
                    setOptionsVisible(true)
                 }}>
                <Cancel width={18} 
                        height={18}
                        strokeWidth={2.7}
                        style={{padding: 2}}
                         />
            </div>
            : 
            <div className="inputButtonCancel"
                 style={{opacity: "0%", cursor: "text"}}
                 onMouseDown={(e) => {
                    e.preventDefault();
                    toggleInputFocus(true);
                    setOptionsVisible(true)
                 }}>
                

            </div> }
            <div className="inputDiv"
                 onMouseDown={(e) => {
                    e.preventDefault();
                    toggleInputFocus(true);
                 }}>

            </div>
            <div className="inputButtonArrow"
                 onMouseDown={(e) => {
                    e.preventDefault();
                    setOptionsVisible(! isOptionsVisible)
                     toggleInputFocus(! isOptionsVisible);
                
                 }}>
                {isOptionsVisible ? 
                    <NavArrowUp width={18} 
                                height={18}
                                strokeWidth={2.7}
                                style={{padding: 2}} />
                :
                    <NavArrowDown width={18} 
                                height={18}
                                strokeWidth={2.7}
                                style={{padding: 2}} />
                }
            </div>
        </div>
        
        {isOptionsVisible ? 
            <div className="optionsContainer"
                 ref={optionsPaneRef}
                 style={{marginTop: 40}}>
                
                {filteredOptions.length == 0 ?
                    <li className="noResultsListElement">
                        No Results
                    </li>
                :
                    filteredOptions.map((option: HighlightedOption) => {
                        return (
                            <li className="listElement"
                                onMouseDown={() => {
                                    setUserInput(option.option);
                                    highlightSelectedOption(option);
                                    setOptionsVisible(false);
                                }}>
                                {option.optionHighlighted}
                            </li>
                        )
                    })
                }
            </div>
        : ""}
        
    </div>

    

    </>
    )
}
