<?php
//Load Composer's autoloader
require 'vendor/autoload.php';

use Kreait\Firebase\Factory;

class FirebaseAuth
{
	function isUserAllowed($id)
	{
		try {
			// Firebase configuration file is in a protected folder, should never be
			// public :)
			$factory = (new \Firebase\Factory())
				->withCredentials('../protected/firebaseJson.json')
				->withDatabaseUri('https://tsb-aplication.firebaseio.com')
				->create();
			$database = $factory->getDatabase();
			$reference = $database->getReference('private/usersMetadata/' . $id . "/pinfo/uid");

			$snapshot = $reference->getSnapshot();
			// check if user exists
			if ($snapshot->exists()) {
				return true;
			} else {
				return false;
			}
		} catch (Exception $e) {
			return false;
		}
	}
}
