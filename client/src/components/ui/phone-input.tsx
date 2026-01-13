import { forwardRef, useState, useEffect } from "react";
import { Input } from "./input";
import { Label } from "./label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

interface PhoneInputProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  id?: string;
  placeholder?: string;
}

interface CountryCode {
  code: string;
  name: string;
  flag: string;
  format: (num: string) => string;
  validate: (num: string) => boolean;
  maxLength: number;
}

const COUNTRY_CODES: CountryCode[] = [
  {
    code: '+39',
    name: 'Italia',
    flag: '🇮🇹',
    format: (num: string) => {
      // Formato: +39 XXX XXX XXXX
      const digits = num.replace(/\D/g, '');
      if (digits.length <= 3) return digits;
      if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
      return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 10)}`;
    },
    validate: (num: string) => {
      const digits = num.replace(/\D/g, '');
      return digits.length === 10;
    },
    maxLength: 10
  },
  {
    code: '+41',
    name: 'Svizzera',
    flag: '🇨🇭',
    format: (num: string) => {
      // Formato: +41 XX XXX XX XX
      const digits = num.replace(/\D/g, '');
      if (digits.length <= 2) return digits;
      if (digits.length <= 5) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
      if (digits.length <= 7) return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
      return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 7)} ${digits.slice(7, 9)}`;
    },
    validate: (num: string) => {
      const digits = num.replace(/\D/g, '');
      return digits.length === 9;
    },
    maxLength: 9
  },
  {
    code: '+49',
    name: 'Germania',
    flag: '🇩🇪',
    format: (num: string) => {
      // Formato: +49 XXX XXXXXXX
      const digits = num.replace(/\D/g, '');
      if (digits.length <= 3) return digits;
      return `${digits.slice(0, 3)} ${digits.slice(3, 10)}`;
    },
    validate: (num: string) => {
      const digits = num.replace(/\D/g, '');
      return digits.length >= 10 && digits.length <= 11;
    },
    maxLength: 11
  },
  {
    code: '+33',
    name: 'Francia',
    flag: '🇫🇷',
    format: (num: string) => {
      // Formato: +33 X XX XX XX XX
      const digits = num.replace(/\D/g, '');
      if (digits.length <= 1) return digits;
      if (digits.length <= 3) return `${digits.slice(0, 1)} ${digits.slice(1)}`;
      if (digits.length <= 5) return `${digits.slice(0, 1)} ${digits.slice(1, 3)} ${digits.slice(3)}`;
      if (digits.length <= 7) return `${digits.slice(0, 1)} ${digits.slice(1, 3)} ${digits.slice(3, 5)} ${digits.slice(5)}`;
      return `${digits.slice(0, 1)} ${digits.slice(1, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 7)} ${digits.slice(7, 9)}`;
    },
    validate: (num: string) => {
      const digits = num.replace(/\D/g, '');
      return digits.length === 9;
    },
    maxLength: 9
  },
  {
    code: '+44',
    name: 'Regno Unito',
    flag: '🇬🇧',
    format: (num: string) => {
      // Formato: +44 XXXX XXXXXX
      const digits = num.replace(/\D/g, '');
      if (digits.length <= 4) return digits;
      return `${digits.slice(0, 4)} ${digits.slice(4, 10)}`;
    },
    validate: (num: string) => {
      const digits = num.replace(/\D/g, '');
      return digits.length === 10;
    },
    maxLength: 10
  },
  {
    code: '+34',
    name: 'Spagna',
    flag: '🇪🇸',
    format: (num: string) => {
      // Formato: +34 XXX XX XX XX
      const digits = num.replace(/\D/g, '');
      if (digits.length <= 3) return digits;
      if (digits.length <= 5) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
      if (digits.length <= 7) return `${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5)}`;
      return `${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 7)} ${digits.slice(7, 9)}`;
    },
    validate: (num: string) => {
      const digits = num.replace(/\D/g, '');
      return digits.length === 9;
    },
    maxLength: 9
  },
];

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value = '', onChange, label, id, placeholder }, ref) => {
    // Parse existing value
    const parsePhoneValue = (val: string): { countryCode: string; number: string } => {
      if (!val) return { countryCode: '+39', number: '' };

      const matchedCountry = COUNTRY_CODES.find(c => val.startsWith(c.code));
      if (matchedCountry) {
        const number = val.slice(matchedCountry.code.length).trim();
        return { countryCode: matchedCountry.code, number };
      }

      return { countryCode: '+39', number: val };
    };

    const parsed = parsePhoneValue(value);
    const [countryCode, setCountryCode] = useState(parsed.countryCode);
    const [phoneNumber, setPhoneNumber] = useState(parsed.number);

    useEffect(() => {
      const newParsed = parsePhoneValue(value);
      setCountryCode(newParsed.countryCode);
      setPhoneNumber(newParsed.number);
    }, [value]);

    const currentCountry = COUNTRY_CODES.find(c => c.code === countryCode) || COUNTRY_CODES[0];

    const handlePhoneChange = (newNumber: string) => {
      // Remove all non-digits
      const digits = newNumber.replace(/\D/g, '');

      // Limit to max length for this country
      const limitedDigits = digits.slice(0, currentCountry.maxLength);

      // Format the number
      const formatted = currentCountry.format(limitedDigits);

      setPhoneNumber(formatted);

      // Notify parent with full phone number (code + space + number)
      if (onChange) {
        const fullNumber = limitedDigits ? `${countryCode} ${formatted}` : '';
        onChange(fullNumber);
      }
    };

    const handleCountryChange = (newCode: string) => {
      setCountryCode(newCode);

      // Reset phone number when changing country
      const digits = phoneNumber.replace(/\D/g, '');
      const newCountry = COUNTRY_CODES.find(c => c.code === newCode) || COUNTRY_CODES[0];
      const limitedDigits = digits.slice(0, newCountry.maxLength);
      const formatted = newCountry.format(limitedDigits);

      setPhoneNumber(formatted);

      if (onChange) {
        const fullNumber = limitedDigits ? `${newCode} ${formatted}` : '';
        onChange(fullNumber);
      }
    };

    return (
      <div className="space-y-2">
        {label && <Label htmlFor={id}>{label}</Label>}
        <div className="flex gap-2">
          <Select value={countryCode} onValueChange={handleCountryChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COUNTRY_CODES.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  <span className="flex items-center gap-2">
                    <span>{country.flag}</span>
                    <span>{country.code}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            ref={ref}
            id={id}
            type="tel"
            value={phoneNumber}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder={placeholder || currentCountry.format('123456789')}
            className="flex-1"
          />
        </div>
        <p className="text-xs text-gray-500">
          Formato: {countryCode} {currentCountry.format(''.padEnd(currentCountry.maxLength, 'X'))}
        </p>
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';
