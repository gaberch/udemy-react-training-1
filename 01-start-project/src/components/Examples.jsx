import { useState, Fragment } from "react";

import TabButton from "./TabButton";
import Tabs from "./Tabs.jsx";
import Section from "./Section.jsx";
import { EXAMPLES } from '../data.js';

export default function Examples() {
  const [selectedTopic, setSelectedTopic] = useState();

  const handleSelect = (selectedButton) => {
    // selectedButton => 'components', 'jsx', 'props', 'state'
    setSelectedTopic(selectedButton);
  }

  const tabContent = !selectedTopic ? (
    <p>Please select a topic.</p>
  ) : (
    <div id="tab-content">
      <h3>{EXAMPLES[selectedTopic].title}</h3>
      <p>{EXAMPLES[selectedTopic].description}</p>
      <pre>
        <code>
          {EXAMPLES[selectedTopic].code}
        </code>
      </pre>
    </div>
  );

  return (
    <Section id="examples" title="Examples">
      <Tabs
        buttons={
          <>
            <TabButton 
              onClick={() => handleSelect('components')}
              isSelected={selectedTopic === 'components'}
            >
              Components
            </TabButton>  
            <TabButton 
              onClick={() => handleSelect('jsx')}
              isSelected={selectedTopic === 'jsx'}
            >
              JSX
            </TabButton>   
            <TabButton 
              onClick={() => handleSelect('props')}
              isSelected={selectedTopic === 'props'}
            >
              Props
            </TabButton>
            <TabButton 
              onClick={() => handleSelect('state')}
              isSelected={selectedTopic === 'state'}
            >
              State
            </TabButton>
          </>
        }
        // ButtonsContainer="div"
      >
        {tabContent}
      </Tabs>
      
    </Section>
  )
}