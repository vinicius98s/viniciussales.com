import React, { useState, useContext } from 'react';
import addToMailchimp from 'gatsby-plugin-mailchimp';
import ReactGA from 'react-ga';

import { ThemeContext } from 'src/components/LayoutContext';
import Button from 'src/components/Button';

import { Form } from './styles';

const EmailSubscription = () => {
  const { colorTheme } = useContext(ThemeContext);
  const [name, setName] = useState({
    value: '',
    error: '',
  });
  const [email, setEmail] = useState({
    value: '',
    error: '',
  });
  const [message, setMessage] = useState('');

  const validateEmail = mail =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail);

  const validateFields = () => {
    if (!name.value.length) {
      setName({
        ...name,
        error: 'Name is required',
      });
    }

    if (!email.value.length) {
      setEmail({
        ...email,
        error: 'Email is required',
      });
    } else if (!validateEmail(email.value)) {
      setEmail({
        ...email,
        error: 'Email is not valid',
      });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    validateFields();

    if (!name.error && !email.error) {
      const { result, msg } = await addToMailchimp(email.value, {
        FNAME: name.value,
      });

      if (result !== 'error') {
        setMessage('Thanks for your subscription!');

        ReactGA.event({
          category: 'Email',
          action: 'Subscribed to the newsletter',
          label: `Name: ${name.value}, Email: ${email.value}`,
        });

        setName({
          value: '',
          error: '',
        });

        setEmail({
          value: '',
          error: '',
        });
      } else {
        ReactGA.event({
          category: 'Email',
          action: 'Failed to subscribe to the newsletter',
          label: `Message: ${msg}`,
        });

        setMessage('Something went wrong, please try again.');
      }
    }
  };

  return (
    <Form
      name="email-subscription"
      netlify
      onSubmit={handleSubmit}
      colorTheme={colorTheme}
    >
      <label htmlFor="name">
        <div>
          Name:
          <span>{name.error}</span>
        </div>
        <input
          type="text"
          name="name"
          placeholder="Jhon"
          value={name.value}
          onChange={e => setName({ value: e.target.value, error: '' })}
        />
      </label>
      <label htmlFor="email">
        <div>
          Email:
          <span>{email.error}</span>
        </div>
        <input
          type="email"
          name="email"
          placeholder="example@email.com"
          value={email.value}
          onChange={e => setEmail({ value: e.target.value, error: '' })}
        />
        {message && <p>{message}</p>}
      </label>
      <Button
        title="Subscribe"
        fontWeight="bold"
        borderRadius={{
          topLeft: 'mini',
          topRight: 'mini',
          bottomRight: 'mini',
          bottomLeft: 'mini',
        }}
        margin={{
          top: '40px',
        }}
        height="40px"
        width="150px"
        fontSize="16px"
      />
    </Form>
  );
};

export default EmailSubscription;
