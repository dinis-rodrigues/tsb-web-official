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
			$factory = (new Factory)->withServiceAccount('../protected/firebaseJson.json');
			$database = $factory->createDatabase();
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
