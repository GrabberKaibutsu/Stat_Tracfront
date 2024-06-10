import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage';
import Characters from './components/Chara';
import CharacterSheet from './pages/characterSheet';
import SpellBook from './pages/SpellBook';
import SpellDetail from './components/SpellDetail';
import Skills from './pages/skillPage';
import SkillDetail from './components/SkillDetail';
import NavBar from './components/NavBar';
import Logout from './pages/logout';
import Signup from './pages/signup';
import EditSkill from './pages/EditSkill';
import Login from './pages/Login';
import NewCharacter from './components/NewCharacter'; 
import NewSpell from './components/NewSpell'; 
import NewSkill from './components/NewSkill'; 
import DiceRollerPage from './components/DiceRoller';
import EditSpell from './pages/EditSpell';
import EditCharacter from './pages/EditCharacter';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/new" element={<NewCharacter />} />
          <Route path="/characters/:id" element={<CharacterSheet />} />
          <Route path="/characters/:id/edit" element={<EditCharacter />} />
          <Route path="/characters/:id/spells" element={<SpellBook />} />
          <Route path="/characters/:id/spells/new" element={<NewSpell />} />
          <Route path="/characters/:id/spells/:spellId" element={<SpellDetail />} />
          <Route path="/characters/:id/spells/:spellId/edit" element={<EditSpell />} /> 
          <Route path="/characters/:id/skills/edit" element={<EditSkill />} />
          <Route path="/characters/:id/skills" element={<Skills />} />
          <Route path="/characters/:id/skills/new" element={<NewSkill />} />
          <Route path="/characters/:id/skills/:skillId" element={<SkillDetail />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/character/new" element={<NewCharacter />} />
          <Route path="/roll-dice" element={<DiceRollerPage />} />
        </Routes>
      </div>
      <div className="h-12"></div>
      <NavBar />
    </div>
  );
};

export default App;