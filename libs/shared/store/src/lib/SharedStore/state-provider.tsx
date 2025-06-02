import { useEffect } from 'react';
import { useAppState } from './glucose.store';

interface StateProviderProps {
  children: React.ReactNode;
}

export function StateProvider({ children }: StateProviderProps) {
  const {
    setLoading,
    setError,
    setAuthToken,
    setPatientInfo,
    setReadings,
    setLatestReading,
    authToken,
    isAuthenticated,
  } = useAppState();

  // First effect just for authentication
  useEffect(() => {
    const authenticate = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('http://localhost:3333/api/libre/login', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Authentication failed');
        }

        const data = await response.json();
        setAuthToken(data.data.authTicket.token);
      } catch (err) {
        setError('Authentication failed. Please try again.');
        console.error('Auth error:', err);
      } finally {
        setLoading(false);
      }
    };

    // Check if we need to authenticate
    const checkAuthentication = async () => {
      // If we have a token, try to validate it by making a request
      if (authToken) {
        try {
          const response = await fetch(
            'http://localhost:3333/api/libre/connections',
            {
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
              },
            }
          );

          // If the request is successful, we don't need to re-authenticate
          if (response.ok) {
            return;
          }

          // If we get here, the token is invalid
          setAuthToken(null);
        } catch (err) {
          console.error('Error validating token:', err);
          setAuthToken(null);
        }
      }

      // If we don't have a token or it's invalid, authenticate
      if (!authToken) {
        await authenticate();
      }
    };

    checkAuthentication();
  }, [setLoading, setError, setAuthToken, authToken]);

  // Separate effect for data loading that depends on authentication
  useEffect(() => {
    const loadData = async () => {
      if (!isAuthenticated || !authToken) return;

      try {
        setLoading(true);
        setError(null);

        // Get patient info
        const infoResponse = await fetch(
          'http://localhost:3333/api/libre/connections',
          {
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!infoResponse.ok) {
          throw new Error('Failed to load patient information');
        }

        const infoData = await infoResponse.json();
        if (!infoData.data || !infoData.data[0]) {
          throw new Error('No patient information found');
        }

        setPatientInfo(infoData.data[0]);

        // Get logbook data
        const logbookResponse = await fetch(
          'http://localhost:3333/api/libre/logbook',
          {
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!logbookResponse.ok) {
          throw new Error('Failed to load logbook data');
        }

        const logbookData = await logbookResponse.json();
        if (logbookData.data && logbookData.data.length > 0) {
          setReadings(logbookData.data);
          setLatestReading(logbookData.data[0]);
        }
      } catch (err) {
        setError('Failed to load data. Please try again.');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [
    isAuthenticated,
    authToken,
    setLoading,
    setError,
    setPatientInfo,
    setReadings,
    setLatestReading,
  ]);

  return <>{children}</>;
}
