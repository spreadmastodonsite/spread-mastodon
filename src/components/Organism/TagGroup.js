import React, { useState, useEffect } from 'react';
import Checkbox from '@/components/atoms/checkbox';
import Chip from '@/components/atoms/chip';

export default function TagGroup({ topic, onChange }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isChipChecked, setIsChipChecked] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleCheckboxChange = (event) => {
    if (onChange) {
      onChange(event.target.checked);
    }
    setIsChecked(!isChecked);
    if (!isChecked) {
      setSelectedTags(topic.tags.map((tag) => tag.name));
    } else {
      setSelectedTags([]);
    }
    console.log('selectedTags', selectedTags);
  };

  const handleChipClick = (tag) => {
    const index = selectedTags.indexOf(tag);
    if (index === -1) {
      setSelectedTags([...selectedTags, tag]);
    } else {
      const updatedTags = [...selectedTags];
      updatedTags.splice(index, 1);
      setSelectedTags(updatedTags);
    }
    console.log('selectedTags', selectedTags);
  };

  useEffect(() => {
    setIsChipChecked(selectedTags.length > 0);
    console.log('selectedTags', selectedTags);
  }, [selectedTags]);

  return (
    <div>
      <div className="tag-group">
        <div className="tag-group__content">
          <h3 className="tag-group__category u-heading--xl">
            {topic.category}{' '}
          </h3>
          <ul className="c-chip__group">
            {topic.tags.map((tag) => (
              <li className="c-chip__group-item" key={tag.name}>
                <Chip
                  active={selectedTags.includes(tag.name)}
                  text={tag.name}
                  onClick={handleChipClick}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="tag-group__input">
          <span>Select All</span>
          <Checkbox
            label="Follow"
            name="follow"
            value="follow"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </div>
      </div>
    </div>
  );
}
